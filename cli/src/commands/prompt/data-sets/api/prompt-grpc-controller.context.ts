import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from '../common/system.message.js';
import { GrpcControllerBuilder } from '../../component-builders/api/grpc-controller.builder.js';

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

const messageInstructions = (commands: string[], queries: string[], protoFile: string): string => {
  return ` 
  Create a grpc controller based on the proto file. 
  Here's the protobuff file where you can find all the defined rpcs.
  '''proto
  ${protoFile}
  '''

  Ignore any rpc whose command or query is not provided. 

  Here are the commands and queries. 
  '''typescript
  ${commands.join('\n')}
  ${queries.join('\n')}
  '''
  From the protobuf file we generate typescript code which you can use.
  For Example you import
  import { todo } from '../proto/generated/todo';
  and then you should use each rpc's response to return the response like this.

  '''typescript
    if (result.isOk) {
      return new todo.AddTodoResponse({
        ok: new todo.AddTodoOKResponse({ id: results.data }),
      });
    } else {
      return new todo.AddTodoResponse({
        error: new todo.AddTodoErrorResponse({
          invalidTitleLengthError: new todo.ErrorResponse({
            code: error?.code || 'INVALID_TITLE_LENGTH_ERROR',
            message: error?.message || 'The title is too long.',
          }),
        }),
      });
    }
  '''
  You can assume the necessary handlers are defined, and return a result.
  This result has an \`result.isOk\` boolean value so we don't need to try-catch.
  In case result.isOk === true -> The response data is under \`result.data\`,
  else the error object is under \`result.error\`.
  Each error object has code and message properties with string values.

  DONT forget to decorate each method with the following 2 Decorators.
  '''typescript
  @GrpcMethod('<Service-Name>', '<rpc-name>')
  @Traceable({
    operation: '<rpc-name-with-controller-suffix>',
    serviceName: 'API'
  })
  '''

  You should generate only the methods, and any imports they many need, 
  separated with ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  Create only the method for the provided commands/queries and ignore any remaining rpc.
`;
};

const QUERIES = [];

const PROTOBUF = `
syntax = "proto3";

package todo;

service TodoService {
	rpc Add(AddTodoRequest) returns (AddTodoResponse);
  rpc Complete (CompleteTodoRequest) returns (CompleteTodoResponse);
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
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse invalidTitleLengthError = 3;
  }
}

message AddTodoOKResponse {
  string id = 1;
}

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
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse todoAlreadyExistsError = 3;
  }
}

message CompleteTodoOKResponse {}

`;
export const promptApiGrpcController = (
  // handlers: string[] = HANDLERS.slice(0, 1),
  commands: string[] = [COMMANDS[0]],
  queries: string[] = QUERIES,
  protoBuf: string = PROTOBUF,
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
    content: messageInstructions(COMMANDS, QUERIES, PROTOBUF),
  },
  {
    role: 'assistant',
    content: `
  '''typescript
import { AddTodoCommand } from '@src/lib/bounded-contexts/todo/todo/commands/add-todo.command';
import { CompleteTodoCommand } from '@src/lib/bounded-contexts/todo/todo/commands/complete-todo.command';
import { todo } from '../proto/generated/todo';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';

  ${GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR}
  @GrpcMethod('TodoService', 'Add')
  @Traceable({
    operation: 'AddTodoController',
    serviceName: 'API',
  })
  async addTodo(data: todo.AddTodoRequest): Promise<todo.AddTodoResponse> {
    const command = new AddTodoCommand({ title: data.title });
    const results = await this.commandBus.request(command);
    if (result.isOk) {
      return new todo.AddTodoResponse({
        ok: new todo.AddTodoOKResponse({ id: result.data }),
      });
    } else {
      const error = result.error;
      return new todo.AddTodoResponse({
        error: new todo.AddTodoErrorResponse({
          invalidTitleLengthError: new todo.ErrorResponse({
            code: error?.code || 'INVALID_TITLE_LENGTH_ERROR',
            message: error?.message || 'The title is too long.',
          }),
        }),
      });
    }
  }

  @GrpcMethod('TodoService', 'Complete')
  @Traceable({
    operation: 'CompleteTodoController',
    serviceName: 'API',
  })
  async completeTodo(data: todo.CompleteTodoRequest): Promise<todo.CompleteTodoResponse> {
    const command = new CompleteTodoCommand({ todoId: data.id });
    const result = await this.commandBus.request(command);
    if (result.isOk) {
      return new todo.CompleteTodoResponse({
        ok: new todo.CompleteTodoOKResponse(),
      });
    } else {
      const error = result.error;
      return new todo.CompleteTodoResponse({
        error: new todo.CompleteTodoErrorResponse({
          systemUnavailableError: new todo.ErrorResponse({
            code: error?.code || 'SYSTEM_UNAVAILABLE_ERROR',
            message: error?.message || 'The system is unavailable.',
          }),
        }),
      });
    }
  }

'''
  `,
  },
  {
    role: 'user',
    content: messageInstructions(commands, queries, protoBuf),
  },
];
