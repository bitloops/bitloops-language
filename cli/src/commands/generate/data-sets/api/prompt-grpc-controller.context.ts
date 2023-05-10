import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from '../common/system.message.js';
import { GrpcControllerBuilder } from '../../component-builders/api/grpc-controller.builder.js';
import { CodeSnippets } from '../common/code-snippets.js';

const COMMANDS = [
  `
  export type TAddTodoCommand = {
    title: string;
  };
  
  export class AddTodoCommand extends Application.Command {
    public title: string;
  
    constructor(props: TAddTodoCommand) {
      super('Todo');
      this.title = props.title;
    }
  }
  `,
  `
  export type TCompleteTodoCommand = {
    todoId: string;
  };
  
  export class CompleteTodoCommand extends Application.Command {
    public id: string;
  
    constructor(
      props: TCompleteTodoCommand,
      metadata?: Partial<Application.TCommandMetadata>,
    ) {
      super('Todo', metadata);
      this.id = props.todoId;
    }
  }
  `,
];

const messageInstructionsCommand = (
  command: string,
  protoFile: string,
  packageName: string,
): string => {
  if (!command) {
    throw new Error('Should be called with either command');
  }
  return ` 
  Create a method for a grpc controller.
  Here's the protobuff file where you can find all the defined rpcs.
  ${CodeSnippets.openProto()}
  ${protoFile}
  ${CodeSnippets.closeProto()}

  Here is the provided command. 
  ${CodeSnippets.openTypescript()}
  ${command}
  ${CodeSnippets.closeTypescript()}
  Use only the rpc related to the provided command.

  From the protobuf file we generate typescript code which you can use.
  For example you can assume that this will be imported.
  ${CodeSnippets.openTypescript()}
  import { ${packageName} } from '../proto/generated/${packageName}';
  ${CodeSnippets.closeTypescript()}

  You can assume the necessary handler is defined, and return a result.
  This result has an \`result.isOk\` boolean value so we don't need to try-catch.
  In case result.isOk === true -> The response data is under \`result.data\`,
  else the error object is under \`result.error\`.
  Each error object has code and message properties with string values.
  Define only one key inside each ErrorResponse object, since we use oneof in the protobuf file for ErrorResponses.
  Preferably something like unexpectedError or systemUnavailableError. Whichever you find in the protobuf file is the one you should use.


  DONT forget to decorate each method with the following 2 Decorators.
  ${CodeSnippets.openTypescript()}
  @GrpcMethod('<Service-Name>', '<rpc-name>')
  @Traceable({
    operation: '<rpc-name-with-controller-suffix>',
    serviceName: 'API'
  })
  ${CodeSnippets.closeTypescript()}

  You should generate only the method of the controller, and any needed imports 
  separated with ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}, in the following format.
  ${CodeSnippets.openTypescript()}
  <Imports>
  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  <Method>
  ${CodeSnippets.closeTypescript()}
  
  Create only the method for the provided command and ignore any remaining rpcs.
`;
};

const QUERIES: string[] = [
  `import { Application } from '@bitloops/bl-boilerplate-core';
export class GetTodosQuery extends Application.Query {
  constructor() {
    super('todo');
  }
}`,
];

const messageInstructionsQuery = (
  query: string,
  protoFile: string,
  packageName: string,
): string => {
  if (!query) {
    throw new Error('Should be called with either command');
  }
  return ` 
  Create the method for a grpc controller.
  Here's the protobuff file where you can find all the defined rpcs.
  ${CodeSnippets.openProto()}
  ${protoFile}
  ${CodeSnippets.closeProto()}

  Here is the provided query. 
  ${CodeSnippets.openTypescript()}
  ${query}
 ${CodeSnippets.closeTypescript()}
  Use only the rpc related to the provided query.

  From the protobuf file we generate typescript code which you can use.
  For example you can assume that this will be imported.
  ${CodeSnippets.openTypescript()}
  import { ${packageName} } from '../proto/generated/${packageName}';
  ${CodeSnippets.closeTypescript()}

  You can assume the necessary handler is defined, and returns a result.
  This result has an \`result.isOk\` boolean value so we don't need to try-catch.
  In case result.isOk === true -> The response data is under \`result.data\`,
  else the error object is under \`result.error\`.
  Each error object has code and message properties with string values.
  Define only one key inside each ErrorResponse object, since we use oneof in the protobuf file.
  Preferably something like unexpectedError or systemUnavailableError. Whichever you find in the protobuf file is the one you should use.

  DONT forget to decorate each method with the following 2 Decorators.
  ${CodeSnippets.openTypescript()}
  @GrpcMethod('<Service-Name>', '<rpc-name>')
  @Traceable({
    operation: '<rpc-name-with-controller-suffix>',
    serviceName: 'API'
  })
  ${CodeSnippets.closeTypescript()}

  You should generate only the method of the controller, and any needed imports 
  separated with ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}, in the following format.
  ${CodeSnippets.openTypescript()}
  <Imports>
  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  <Method>
  ${CodeSnippets.closeTypescript()}
  
  Create only the method for the provided query and ignore any remaining rpcs.
`;
};

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
export const promptApiGrpcControllerCommand = (
  command: string,
  protoBuf: string,
  packageName: string,
): ChatCompletionRequestMessage[] => [
  {
    role: 'system',
    content: `  
      You generate NestJS Grpc controllers using the Typescript language. You respond with code only.
      `,
  },
  {
    role: 'user',
    content:
      messageInstructionsCommand(COMMANDS[0], PROTOBUF, 'todo') +
      ` 
  You should use the rpc's response to return the response like this.
  ${CodeSnippets.openTypescript()}
    if (result.isOk) {
      return new ${packageName}.AddTodoResponse({
        ok: new ${packageName}.AddTodoOKResponse({ id: result.data }),
      });
    } else {
      return new ${packageName}.AddTodoResponse({
        error: new ${packageName}.AddTodoErrorResponse({
          unexpectedError: new ${packageName}.ErrorResponse({
            code: error?.code || 'SYSTEM_UNAVAILABLE_ERROR',
            message: error?.message || 'The system is unavailable.',
          }),
        }),
      });
    }
  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'assistant',
    content: `
    ${CodeSnippets.openTypescript()}
import { AddTodoCommand } from '@lib/bounded-contexts/todo/todo/commands/add-todo.command';

  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  @GrpcMethod('TodoService', 'Add')
  @Traceable({
    operation: 'AddTodoController',
    serviceName: 'API',
  })
  async addTodo(data: ${packageName}.AddTodoRequest): Promise<${packageName}.AddTodoResponse> {
    const command = new AddTodoCommand({ title: data.title });
    const result = await this.commandBus.request(command);
    if (result.isOk) {
      return new ${packageName}.AddTodoResponse({
        ok: new ${packageName}.AddTodoOKResponse({ id: result.data }),
      });
    } else {
      const error = result.error;
      return new ${packageName}.AddTodoResponse({
        error: new ${packageName}.AddTodoErrorResponse({
          unexpectedError: new ${packageName}.ErrorResponse({
            code: error?.code || 'SYSTEM_UNAVAILABLE_ERROR',
            message: error?.message || 'The system is unavailable.',
          }),
        }),
      });
    }
  }

  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'user',
    content: messageInstructionsCommand(command, protoBuf, packageName),
  },
];

export const promptApiGrpcControllerQuery = (
  query: string,
  protoBuf: string,
  packageName: string,
): ChatCompletionRequestMessage[] => [
  {
    role: 'system',
    content: `  
      You generate NestJS Grpc controllers using the Typescript language. You respond with code only.
      `,
  },
  {
    role: 'user',
    content:
      messageInstructionsQuery(QUERIES[0], PROTOBUF, 'todo') +
      ` 
  You should use each rpc's response to return the response like this.
  ${CodeSnippets.openTypescript()}
    if (result.isOk) {
      <logic-here>
      return new ${packageName}.GetAllTodosResponse({
        ok: new ${packageName}.GetAllTodosOKResponse({
          todos: mappedData.map((i) => new ${packageName}.Todo(i)),
        }),
      });
    } else {
      const error = result.error;
      console.error('Error while fetching todos:', error?.message);
      return new ${packageName}.GetAllTodosResponse({
        error: new ${packageName}.GetAllTodosErrorResponse({
          unexpectedError: new ${packageName}.ErrorResponse({
            code: error?.code || 'SYSTEM_UNAVAILABLE_ERROR',
            message: error?.message || 'The system is unavailable.',
          }),
        }),
      });
    }
  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'assistant',
    content: `
    ${CodeSnippets.openTypescript()}
    import { GetTodosQuery } from '@lib/bounded-contexts/todo/todo/queries/get-todos.query';

  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  @GrpcMethod('TodoService', 'GetAll')
  @Traceable({
    operation: 'GetAllTodosController',
    serviceName: 'API',
  })
  async getAll(
    data: todo.GetAllTodosRequest,
    metadata: Metadata,
  ): Promise<todo.GetAllTodosResponse> {
    const result = await this.queryBus.request(new GetTodosQuery());
    if (result.isOk) {
      const mappedData = result.data.map((i) => ({
        id: i.id,
        title: i.title,
        completed: i.completed,
      }));
      const dbHash = await sha256Hash(JSON.stringify(mappedData));
      const cachedHashesAreEqual = dbHash === metadata.get('cache-hash')[0];
      if (cachedHashesAreEqual) {
        throw new RpcException('CACHE_HIT');
      }
      return new todo.GetAllTodosResponse({
        ok: new todo.GetAllTodosOKResponse({
          todos: mappedData.map((i) => new todo.Todo(i)),
        }),
      });
    } else {
      const error = result.error;
      console.error('Error while fetching todos:', error?.message);
      return new todo.GetAllTodosResponse({
        error: new todo.GetAllTodosErrorResponse({
          unexpectedError: new todo.ErrorResponse({
            code: error?.code || 'SYSTEM_UNAVAILABLE_ERROR',
            message: error?.message || 'The system is unavailable.',
          }),
        }),
      });
    }
  }
  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'user',
    content: messageInstructionsQuery(query, protoBuf, packageName),
  },
];

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
