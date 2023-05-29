import { ChatCompletionRequestMessage } from 'openai';
import { GrpcControllerBuilder } from '../../../component-builders/api/grpc-controller.builder.js';
import { CodeSnippets } from '../../common/code-snippets.js';

const QUERIES: string[] = [
  `import { Application } from '@bitloops/bl-boilerplate-core';
export class GetTodosQuery extends Application.Query {
  constructor() {
    super('todo');
  }
}`,
];

const QUERY_HANDLERS: string[] = [
  ` export type GetTodosQueryHandlerResponse = Either<
    TTodoReadModelSnapshot[],
    Application.Repo.Errors.Unexpected
  >;
  
  export class GetTodosHandler
    implements Application.IQueryHandler<GetTodosQuery, TTodoReadModelSnapshot[]>
  {
    constructor(
      @Inject(TodoReadRepoPortToken)
      private readonly todoRepo: TodoReadRepoPort,
    ) {}
  
    get query() {
      return GetTodosQuery;
    }
  
    get boundedContext() {
      return 'Todo';
    }
  
    @Traceable({
      operation: '[Todo] GetTodosQueryHandler',
      serviceName: 'Todo',
      metrics: {
        name: '[Todo] GetTodosQueryHandler',
        category: 'queryHandler',
      },
    })
    async execute(query: GetTodosQuery): Promise<GetTodosQueryHandlerResponse> {
      const results = await this.todoRepo.getAll();
      if (results.isFail()) return fail(results.value);
      if (results.value) return ok(results.value);
      return ok([]);
    }
  }`,
];

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

const messageInstructionsQuery = (
  query: string,
  handler: string,
  protoFile: string,
  packageName: string,
  commandContext: { boundedContextName: string; moduleName: string },
): string => {
  const { boundedContextName, moduleName } = commandContext;
  if (!query) {
    throw new Error('Missing query');
  }

  const index = handler.indexOf(' implements');
  const queryHandlerResponse = handler.slice(0, index);
  return ` 
  Create the method for a grpc controller.

  The method must be decorated with the following 2 Decorators.
  ${CodeSnippets.openTypescript()}
  @GrpcMethod('<Service-Name>', '<rpc-name>')
  @Traceable({
    operation: '<rpc-name-with-controller-suffix>',
    serviceName: 'API'
  })
  ${CodeSnippets.closeTypescript()}

  Here's the protobuff file where you can find all the defined rpcs.
  ${CodeSnippets.openProto()}
  ${protoFile}
  ${CodeSnippets.closeProto()}

  Here is the provided query. 
  ${CodeSnippets.openTypescript()}
  ${query}
 ${CodeSnippets.closeTypescript()}

  And this the query handler's response type.
  ${CodeSnippets.openTypescript()}
  ${queryHandlerResponse}
  ${CodeSnippets.closeTypescript()}
  Each possible error of the response is depicted in the protobuf file.

  Use only the rpc related to the provided query, for the method you are creating.

  From the protobuf file we generate typescript code which you can use.
  For example you can assume that this will be imported. You must not import it yourself.
  ${CodeSnippets.openTypescript()}
  import { ${packageName} } from '../proto/generated/${packageName}';
  ${CodeSnippets.closeTypescript()}

  You can assume the necessary handler is defined, and returns a serialized result.
  This result has an \`result.isOk\` boolean value so we don't need to try-catch.
  In case result.isOk === true -> The response data is under \`result.data\`,
  else the error object is under \`result.error\`.
  Each error object has errorId and message properties with string values.
  We use the errorId to distinguish between different errors.


  You should generate only the method of the controller, and any needed imports 
  separated with ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}, in the following format.
  ${CodeSnippets.openTypescript()}
  <Imports>
  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  <Method>
  ${CodeSnippets.closeTypescript()}

  As imports, you only add the import of the command and of any possible errors. You can use this information for that:
  boundedContextName: ${boundedContextName}
  moduleName: ${moduleName}
  
  Create only the method for the provided query and ignore any remaining rpcs.
`;
};

export const promptApiGrpcControllerQuery = (
  query: string,
  handler: string,
  protoBuf: string,
  packageName: string,
  queryContext: { boundedContextName: string; moduleName: string },
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
      messageInstructionsQuery(QUERIES[0], QUERY_HANDLERS[0], PROTOBUF, 'todo', {
        boundedContextName: 'todo',
        moduleName: 'todo-module',
      }) +
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
    } 
    <error-handling-here>
  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'assistant',
    content: `
    ${CodeSnippets.openTypescript()}
  import { Application } from '@bitloops/bl-boilerplate-core';
  import { GetTodosQuery } from '@lib/bounded-contexts/todo/todo-module/queries/get-todos.query';

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
    } 
    const error = result.error;
    switch (error.errorId) {
      case Application.Repo.Errors.Unexpected.errorId: {
        return new todo.GetAllTodosResponse({
          error: new todo.GetAllTodosErrorResponse({
            unexpectedError: new todo.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
      default: {
        return new todo.GetAllTodosResponse({
          error: new todo.GetAllTodosErrorResponse({
            unexpectedError: new todo.ErrorResponse({
              code: error.errorId,
              message: error.message,
            }),
          }),
        });
      }
    }
  }
  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'user',
    content: messageInstructionsQuery(query, handler, protoBuf, packageName, queryContext),
  },
];
