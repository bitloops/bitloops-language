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

const messageInstructions = (command: string, protoFile: string, packageName: string): string => {
  if (!command) {
    throw new Error('Should be called with either command');
  }
  return ` 
  Create a grpc controller based on the proto file. 
  Here's the protobuff file where you can find all the defined rpcs.
  ${CodeSnippets.openProto()}
  ${protoFile}
  ${CodeSnippets.closeProto()}

  Ignore any rpc whose command is not provided. 

  Here is the provided command. 
  ${CodeSnippets.openTypescript()}
  ${command}
  ${CodeSnippets.closeTypescript()}
  From the protobuf file we generate typescript code which you can use.
  For Example you import
  import { ${packageName} } from '../proto/generated/${packageName}';

  You can assume the necessary handlers are defined, and return a result.
  This result has an \`result.isOk\` boolean value so we don't need to try-catch.
  In case result.isOk === true -> The response data is under \`result.data\`,
  else the error object is under \`result.error\`.
  Each error object has code and message properties with string values.

  DONT forget to decorate each method with the following 2 Decorators.
  ${CodeSnippets.openTypescript()}
  @GrpcMethod('<Service-Name>', '<rpc-name>')
  @Traceable({
    operation: '<rpc-name-with-controller-suffix>',
    serviceName: 'API'
  })
  ${CodeSnippets.closeTypescript()}

  You should generate only the methods, and any imports they many need, 
  separated with ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}, in the following format.
  ${CodeSnippets.openTypescript()}
  <Imports>
  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  <Method>
  ${CodeSnippets.closeTypescript()}
  
  Create only the method for the provided commands and ignore any remaining rpcs.
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
export const promptApiGrpcController = (
  command: string,
  protoBuf: string,
  packageName: string,
): ChatCompletionRequestMessage[] => [
  promptContextMessage,
  {
    role: 'system',
    content: `  
      You generate NestJS Grpc controllers using the Typescript language. You respond with code only.
      `,
  },
  {
    role: 'user',
    content:
      messageInstructions(COMMANDS[0], PROTOBUF, 'todo') +
      ` 
  You should use each rpc's response to return the response like this.
  ${CodeSnippets.openTypescript()}
    if (result.isOk) {
      return new ${packageName}.AddTodoResponse({
        ok: new ${packageName}.AddTodoOKResponse({ id: results.data }),
      });
    } else {
      return new ${packageName}.AddTodoResponse({
        error: new ${packageName}.AddTodoErrorResponse({
          invalidTitleLengthError: new ${packageName}.ErrorResponse({
            code: error?.code || 'INVALID_TITLE_LENGTH_ERROR',
            message: error?.message || 'The title is too long.',
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
import { AddTodoCommand } from '@src/lib/bounded-contexts/todo/todo/commands/add-todo.command';

  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  @GrpcMethod('TodoService', 'Add')
  @Traceable({
    operation: 'AddTodoController',
    serviceName: 'API',
  })
  async addTodo(data: ${packageName}.AddTodoRequest): Promise<${packageName}.AddTodoResponse> {
    const command = new AddTodoCommand({ title: data.title });
    const results = await this.commandBus.request(command);
    if (result.isOk) {
      return new ${packageName}.AddTodoResponse({
        ok: new ${packageName}.AddTodoOKResponse({ id: result.data }),
      });
    } else {
      const error = result.error;
      return new ${packageName}.AddTodoResponse({
        error: new ${packageName}.AddTodoErrorResponse({
          invalidTitleLengthError: new ${packageName}.ErrorResponse({
            code: error?.code || 'INVALID_TITLE_LENGTH_ERROR',
            message: error?.message || 'The title is too long.',
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
    content: messageInstructions(command, protoBuf, packageName),
  },
];
