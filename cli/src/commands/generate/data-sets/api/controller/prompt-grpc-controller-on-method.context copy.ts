import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from '../../common/system.message.js';
import { GrpcControllerBuilder } from '../../../component-builders/api/grpc-controller.builder.js';
import { CodeSnippets } from '../../common/code-snippets.js';

const PROTOBUF = `

syntax = "proto3";

package todo;

service TodoService {
  rpc Add(AddTodoRequest) returns (AddTodoResponse);
  rpc ModifyTitle(ModifyTitleTodoRequest) returns (ModifyTitleTodoResponse);
  rpc Complete(CompleteTodoRequest) returns (CompleteTodoResponse);
  rpc GetAll(GetAllTodosRequest) returns (GetAllTodosResponse);
  rpc InitializeSubscriptionConnection(InitializeConnectionRequest) returns (InitializeConnectionResponse);
  rpc KeepSubscriptionAlive(KeepSubscriptionAliveRequest) returns (KeepSubscriptionAliveResponse);
  rpc On(OnTodoRequest) returns (stream OnEvent);
}

message InitializeConnectionRequest {}
message InitializeConnectionResponse {
  string subscriberId = 1;
}

message KeepSubscriptionAliveRequest {
  string subscriberId = 1;
}
message KeepSubscriptionAliveResponse {
  optional string renewedAuthToken = 1;
}

enum TODO_EVENTS {
  ADDED = 0;
  TITLE_MODIFIED = 1;
  COMPLETED = 2;
}

message OnTodoRequest {
  string subscriberId = 1;
  repeated TODO_EVENTS events = 2;
}

message OnEvent {
  oneof event {
    Todo onAdded = 1;
    Todo onTitleModified = 2;
    Todo onCompleted = 3;
  }
}

message ErrorResponse {
  string code = 1;
  string message = 2;
}

message AddTodoRequest {
  string title = 1;
}

message AddTodoResponse {
  oneof result {
    AddTodoOKResponse ok = 1;
    AddTodoErrorResponse error = 2;
  }
}

message AddTodoErrorResponse {
  oneof error {
    ErrorResponse titleOutOfBoundsError = 1;
    ErrorResponse unexpectedError = 2;
  }
}

message AddTodoOKResponse {
  string id = 1;
}

message ModifyTitleTodoRequest {
  string id = 1;
  string title = 2;
}

message ModifyTitleTodoResponse {
  oneof result {
    ModifyTitleTodoOKResponse ok = 1;
    ModifyTitleTodoErrorResponse error = 2;
  }
}

message ModifyTitleTodoErrorResponse {
  oneof error {
    ErrorResponse todoNotFoundError = 1;
    ErrorResponse unexpectedError = 2;
    ErrorResponse titleOutOfBoundsError = 3;
  }
}

message ModifyTitleTodoOKResponse {}

message CompleteTodoRequest {
  string id = 1;
}

message CompleteTodoResponse {
  oneof result {
    CompleteTodoOKResponse ok = 1;
    CompleteTodoErrorResponse error = 2;
  }
}

message CompleteTodoErrorResponse {
  oneof error {
    ErrorResponse todoNotFoundError = 1;
    ErrorResponse unexpectedError = 2;
    ErrorResponse todoAlreadyCompletedError = 3;
  }
}

message CompleteTodoOKResponse {}

message GetAllTodosRequest {}

message GetAllTodosResponse {
  oneof result {
    GetAllTodosOKResponse ok = 1;
    GetAllTodosErrorResponse error = 2;
  }
}

message GetAllTodosErrorResponse {
  oneof error {
    ErrorResponse unexpectedError = 1;
  }
}

message GetAllTodosOKResponse {
  repeated Todo todos = 1;
}

message Todo {
  string id = 1;
  string title = 2;
  bool completed = 3;
  string userId = 4;
}
`;

/**
 * On method - For subscriptions
 */

const messageInstructionsOnMethod = (
  protoFile: string,
  integrationEvents: string[],
  packageName: string,
  serviceName: string,
): string => {
  if (!integrationEvents) {
    throw new Error('Should be called with integration events');
  }
  return ` 
  Given this protobuf file:
  ${CodeSnippets.openProto()}
  ${protoFile}
  ${CodeSnippets.closeProto()}

  You will create a GrpcMethod 'On' which maps every event defined in the protobuf file's events enum, to the name of a PubSubIntegrationEventHandler.

  ${CodeSnippets.openTypescript()}

  @GrpcMethod(<service-name>, 'On')
  async on(
    request: <package-name>.OnTodoRequest,
    metadata: Metadata,
    call: ServerWritableStream<<package-name>.OnTodoRequest, <package-name>.Todo>,
  ) {
    const { subscriberId, events } = request;
    await new Promise((resolve) => {
      const topics = events.map((i) => {
        switch (i) {
          <switch-body>
        }
      });
      subscribe(subscriberId, topics, call, resolve);
    });
  }
  ${CodeSnippets.closeTypescript()}

  Where service-name = ${serviceName},
    package-name = ${packageName},

  switch-body should create one case per enum event defined in the protobuf, and return 
  the related IntegrationEventHandler name.

  For example:
    case <package-name>.TODO_EVENTS.ADDED:
      return TodoAddedPubSubIntegrationEventHandler.name;

  For each integration event, import its handler like this:
  import <pub-sub-integration-event-handler> from ./pub-sub-handlers/<pub-sub-integration-event>.integration-handler;
  
  for example:
  ${CodeSnippets.openTypescript()}
  import { TodoAddedPubSubIntegrationEventHandler } from './pub-sub-handlers/todo-added.integration-handler';
  ${CodeSnippets.closeTypescript()}


  Your response should be in the following format, separating any needed imports and the method implementation.
  ${CodeSnippets.openTypescript()}
  <Imports>
  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  <Method>
  ${CodeSnippets.closeTypescript()}

`;
};

export const promptApiGrpcControllerOnEventMethod = (
  protobuf: string,
  integrationEvents: string[],
  packageName: string,
  serviceName: string,
): ChatCompletionRequestMessage[] => [
  promptContextMessage,
  {
    role: 'system',
    content: `  
      You generate NestJS Grpc-related method using Typescript language. You respond with code only.
      `,
  },
  {
    role: 'user',
    content:
      messageInstructionsOnMethod(
        PROTOBUF,
        [
          'TodoAddedIntegrationEvent',
          'TodoTitleModifiedIntegrationEvent',
          'TodoCompletedIntegrationEvent',
        ],
        'todo',
        'TodoService',
      ) +
      ` 
  You should use each rpc's response to return the response like this.
  `,
  },
  {
    role: 'assistant',
    content: `
    ${CodeSnippets.openTypescript()}
  import { TodoAddedPubSubIntegrationEventHandler } from './pub-sub-handlers/todo-added.integration-handler';
  import { TodoTitleModifiedPubSubIntegrationEventHandler } from './pub-sub-handlers/todo-title-modified.integration-handler';
  import { TodoCompletedPubSubIntegrationEventHandler } from './pub-sub-handlers/todo-completed.integration-handler';
    
  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}

  @GrpcMethod('TodoService', 'On')
  async on(
    request: todo.OnTodoRequest,
    metadata: Metadata,
    call: ServerWritableStream<todo.OnTodoRequest, todo.Todo>,
  ) {
    const { subscriberId, events } = request;
    await new Promise((resolve) => {
      const topics = events.map((i) => {
        switch (i) {
          case todo.TODO_EVENTS.ADDED:
            return TodoAddedPubSubIntegrationEventHandler.name;
          case todo.TODO_EVENTS.TITLE_MODIFIED:
            return TodoTitleModifiedPubSubIntegrationEventHandler.name;
          case todo.TODO_EVENTS.COMPLETED:
            return TodoCompletedPubSubIntegrationEventHandler.name;
        }
      });
      subscribe(subscriberId, topics, call, resolve);
    });
  }

  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'user',
    content: messageInstructionsOnMethod(protobuf, integrationEvents, packageName, serviceName),
  },
];
