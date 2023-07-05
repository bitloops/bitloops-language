/**
 * Real time grpc pub sub handlers
 */

import { ChatCompletionRequestMessage } from 'openai';
import { CodeSnippets } from '../common/code-snippets.js';
import { getPubSubHandlerNameFromIntegrationEvent } from '../common/names.js';
// import { GrpcPubSubHandlerBuilder } from '../../component-builders/api/grpc-pub-sub-handler.builder.js';

const messageInstructionsPubSubHandlers = (
  protoFile: string,
  integrationEventFileContent: string,
  integrationEventName: string,
  packageName: string,
): string => {
  if (!integrationEventFileContent) {
    throw new Error('Should be called with integration event');
  }
  return ` 
  Given this protobuf file:

  You will create a typescript class .

  You will create a handler that reacts to IntegrationEvents, and publishes grpc stream events.
  Here is the protobuf file:
  ${CodeSnippets.openProto()}
  ${protoFile}
  ${CodeSnippets.closeProto()}
  
  Given this integration event: 
  ${CodeSnippets.openTypescript()}
  ${CodeSnippets.sanitizeTypescriptImports(integrationEventFileContent)}
  ${CodeSnippets.closeTypescript()}

  Map the properties of the incoming event to the respective grpc stream event defined in the protobuf file.
  If the integration event has multiple versions, the handler maps the first event version to the grpc stream event.
  Use default values for any properties you can't find in the event.

  We have generated typescript code from the protobuf file, which can be used as:
  ${CodeSnippets.openTypescript()}
  import { <package-name> } from '../../proto/generated/<package-name>';
  ${CodeSnippets.closeTypescript()}
  In order to create the response objects.
  Where package-name = ${packageName},
  
  The handler class will be named: ${getPubSubHandlerNameFromIntegrationEvent(integrationEventName)}

  You access the incoming event properties directly from the event object.
  Payload is undefined, do not use it.
  For example
  use \`event.userId\` and not \`event.payload.userId\`

`;
};

const INTEGRATION_EVENT_FILE_CONTENT = `
import { Infra } from '@bitloops/bl-boilerplate-core';
import { TodoAddedDomainEvent } from '../../domain/events/todo-added.domain-event';
import { IntegrationTodoAddedSchemaV1 } from '../../structs/integration-todo-added-schema-v-1.struct';
type TIntegrationSchemas = IntegrationTodoAddedSchemaV1;
type ToIntegrationDataMapper = (
  event: TodoAddedDomainEvent
) => TIntegrationSchemas;
export class TodoAddedIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<TIntegrationSchemas> {
  public static readonly boundedContextId = 'todo';
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: TodoAddedIntegrationEvent.toIntegrationDatav1,
  };
  constructor(payload: TIntegrationSchemas, version: string) {
    super(TodoAddedIntegrationEvent.boundedContextId, payload, version);
  }
  static create(event: TodoAddedDomainEvent): TodoAddedIntegrationEvent[] {
    return TodoAddedIntegrationEvent.versions.map((version) => {
      const mapper = TodoAddedIntegrationEvent.versionMappers[version];
      const payload = mapper(event);
      return new TodoAddedIntegrationEvent(payload, version);
    });
  }
  static toIntegrationDatav1(
    event: TodoAddedDomainEvent
  ): IntegrationTodoAddedSchemaV1 {
    const todoAdded = {
      todoId: event.aggregateId,
      title: event.title,
      userId: event.userId,
    };
    return todoAdded;
  }
}


`;

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
    ErrorResponse systemUnavailableError = 1;
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
    ErrorResponse systemUnavailableError = 1;
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
    ErrorResponse systemUnavailableError = 1;
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
    ErrorResponse systemUnavailableError = 1;
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

export const promptPubSubHandlers = (
  protoFile: string,
  integrationEventFileContent: string,
  integrationEventName: string,
  packageName: string,
): ChatCompletionRequestMessage[] => [
  {
    role: 'system',
    content: `  
      You generate a class which is an integration event handler, using Typescript language. You respond with code only.
      `,
  },
  {
    role: 'user',
    content: messageInstructionsPubSubHandlers(
      PROTOBUF,
      INTEGRATION_EVENT_FILE_CONTENT,
      'TodoAddedIntegrationEvent',
      'todo',
    ),
  },
  {
    role: 'assistant',
    content: `
    ${CodeSnippets.openTypescript()}
import { Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { TodoAddedIntegrationEvent } from '@lib/bounded-contexts/todo/todo/contracts/integration-events/todo-added.integration-event';
import { todo } from '../../proto/generated/todo';
import { Subscriptions, Subscribers } from '../todo.grpc.controller';

export class TodoAddedPubSubIntegrationEventHandler implements Application.IHandleIntegrationEvent {
  constructor(
    private readonly subscriptions: Subscriptions,
    private readonly subscribers: Subscribers,
  ) {}
  get event() {
    return TodoAddedIntegrationEvent;
  }

  get boundedContext() {
    return TodoAddedIntegrationEvent.boundedContextId;
  }

  get version() {
    return TodoAddedIntegrationEvent.versions[0]; 
  }

  public async handle(event: TodoAddedIntegrationEvent): Promise<Either<void, never>> {
    console.log(
      '[TodoAddedIntegrationEvent]: Successfully received TodoAdded PubSub IntegrationEvent',
    );
    const subscription = this.subscriptions[TodoAddedPubSubIntegrationEventHandler.name];
    const subscriptionsSubscribers = subscription?.subscribers;
    if (subscriptionsSubscribers) {
      for (const subscriber of subscriptionsSubscribers) {
        const call = this.subscribers[subscriber]?.call;
        if (call) {
          const todoObject = new todo.Todo({
            id: event.todoId,
            title: event.title,
            userId: event.userId,
            completed: false,
          });
          const message = new todo.OnEvent({
            onAdded: todoObject,
          });
          call.write(message as any);
        }
      }
    }

    return ok();
  }
}

  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'user',
    content: messageInstructionsPubSubHandlers(
      protoFile,
      integrationEventFileContent,
      integrationEventName,
      packageName,
    ),
  },
];
