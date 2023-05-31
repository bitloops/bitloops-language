import { ChatCompletionRequestMessage } from 'openai';
import { GrpcControllerBuilder } from '../../../component-builders/api/grpc-controller.builder.js';
import { CodeSnippets } from '../../common/code-snippets.js';

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

const COMMAND_HANDLERS = [
  `
  type AddTodoCommandHandlerResponse = Either<
    string,
    DomainErrors.TitleOutOfBoundsError | Application.Repo.Errors.Unexpected
  >;
  
  export class AddTodoCommandHandler
    implements Application.ICommandHandler<AddTodoCommand, string>
  {
    constructor(
      @Inject(TodoWriteRepoPortToken)
      private readonly todoRepo: TodoWriteRepoPort,
    ) {}
  
    get command() {
      return AddTodoCommand;
    }
  
    get boundedContext() {
      return 'Todo';
    }
  
    @Traceable({
      operation: '[Todo] AddTodoCommandHandler',
      serviceName: 'Todo',
      metrics: {
        name: '[Todo]AddTodoCommandHandler',
        category: 'commandHandler',
      },
    })
    async execute(command: AddTodoCommand): Promise<AddTodoCommandHandlerResponse> {
      const title = TitleVO.create({ title: command.title });
      if (title.isFail()) {
        return fail(title.value);
      }
  
      const userId = UserIdVO.create({
        id: new Domain.UUIDv4(command.metadata.context.userId),
      });
      const todo = TodoEntity.create({
        title: title.value,
        completed: false,
        userId: userId.value,
      });
      if (todo.isFail()) {
        return fail(todo.value);
      }
  
      const saveResult = await this.todoRepo.save(todo.value);
      if (saveResult.isFail()) {
        return fail(saveResult.value);
      }
  
      return ok(todo.value.id.toString());
    }
  }
  `,
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

const messageInstructionsCommand = (
  command: string,
  handler: string,
  protoFile: string,
  packageName: string,
  commandContext: { boundedContextName: string; moduleName: string },
): string => {
  const { boundedContextName, moduleName } = commandContext;
  if (!command) {
    throw new Error('Missing command');
  }

  const index = handler.indexOf(' implements');
  const commandHandlerResponse = handler.slice(0, index);
  return ` 
  Create a method for a grpc controller that corresponds to an rpc of the protobuf file.

  Decorate each method with the following 2 Decorators.
  ${CodeSnippets.openTypescript()}
  @GrpcMethod('<Service-Name>', '<rpc-name>')
  @Traceable({
    operation: '<rpc-name-with-controller-suffix>',
    serviceName: 'API'
  })
  ${CodeSnippets.closeTypescript()}

  Here's the protobuff file.
  ${CodeSnippets.openProto()}
  ${protoFile}
  ${CodeSnippets.closeProto()}


  And here is the provided command. 
  ${CodeSnippets.openTypescript()}
  ${command}
  ${CodeSnippets.closeTypescript()}
  Use only the rpc related to the provided command.

  And this the command handler's response type.
  ${CodeSnippets.openTypescript()}
  ${commandHandlerResponse}
  ${CodeSnippets.closeTypescript()}
  Each possible error of the response is depicted in the protobuf file.

  From the protobuf file we generate typescript code which you can use.
  For example you can assume that this will be imported. You must not import it yourself.
  ${CodeSnippets.openTypescript()}
  import { ${packageName} } from '../proto/generated/${packageName}';
  ${CodeSnippets.closeTypescript()}

  You can assume the necessary handler is defined, and returns a result.
  The result is serialized to the response object which,
  has a \`result.isOk\` boolean value so we don't need to try-catch.
  In case result.isOk === true -> The response data is under \`result.data\`,
  else the error object is under \`result.error\`.
  In the case of error we return the error that corresponds to the systemUnavailableError key only and ignore the rest.


  You should generate only the method of the controller and an import
  separated with ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}, in the following format.
  ${CodeSnippets.openTypescript()}
  <Import-of-command>
  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  <Method>
  ${CodeSnippets.closeTypescript()}
  
  You should only import the command and nothing else, using the information that:
  boundedContextName: ${boundedContextName}
  moduleName: ${moduleName}
  The boundedContextName and the moduleName can be the same, but they can also be different. So be careful.
  
  Create only the method for the provided command and ignore any remaining rpcs.
`;
};

/**
 * @param handler Needed for its response type
 */
export const promptApiGrpcControllerCommand = (
  command: string,
  handler: string,
  protoBuf: string,
  packageName: string,
  commandContext: { boundedContextName: string; moduleName: string },
): ChatCompletionRequestMessage[] => [
  {
    role: 'system',
    content: `  
      You generate NestJS Grpc controllers using the Typescript language. You respond with code only.
      `,
  },
  {
    role: 'user',
    content: messageInstructionsCommand(COMMANDS[0], COMMAND_HANDLERS[0], PROTOBUF, 'todo', {
      boundedContextName: 'todo',
      moduleName: 'core-module',
    }),
  },
  {
    role: 'assistant',
    content: `
    ${CodeSnippets.openTypescript()}
  import { AddTodoCommand } from '@lib/bounded-contexts/todo/core-module/commands/add-todo.command';

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
    } 
    const error = result.error;
    return new ${packageName}.AddTodoResponse({
      error: new ${packageName}.AddTodoErrorResponse({
        systemUnavailableError: new ${packageName}.ErrorResponse({
          code: error.errorId || 'SYSTEM_UNAVAILABLE',
          message: error.message || 'System unavailable',
        }),
      }),
    });
  }

  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'user',
    content: messageInstructionsCommand(command, handler, protoBuf, packageName, commandContext),
  },
];
