import { ChatCompletionRequestMessage } from 'openai';
import { CodeSnippets } from '../common/code-snippets.js';

const HANDLERS = [
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
  `
  type CompleteTodoCommandHandlerResponse = Either<
    void,
    DomainErrors.TodoAlreadyCompletedError | ApplicationErrors.TodoNotFoundError
  >;
  
  export class CompleteTodoHandler
    implements
      Application.IUseCase<
        CompleteTodoCommand,
        Promise<CompleteTodoCommandHandlerResponse>
      >
  {
    constructor(
      @Inject(TodoWriteRepoPortToken)
      private readonly todoRepo: TodoWriteRepoPort,
    ) {}
  
    get command() {
      return CompleteTodoCommand;
    }
  
    get boundedContext() {
      return 'Todo';
    }
  
    @Traceable({
      operation: '[Todo] CompleteTodoCommandHandler',
      serviceName: 'Todo',
      metrics: {
        name: '[Todo] CompleteTodoCommandHandler',
        category: 'commandHandler',
      },
    })
    async execute(
      command: CompleteTodoCommand,
    ): Promise<CompleteTodoCommandHandlerResponse> {
      const todo = await this.todoRepo.getById(new Domain.UUIDv4(command.id));
  
      if (todo.isFail()) {
        return fail(todo.value);
      }
      if (!todo.value) {
        return fail(new ApplicationErrors.TodoNotFoundError(command.id));
      }
      const completedOrError = todo.value.complete();
      if (completedOrError.isFail()) {
        return fail(completedOrError.value);
      }
      const saveResult = await this.todoRepo.update(todo.value);
      if (saveResult.isFail()) {
        return fail(saveResult.value);
      }
  
      return ok();
    }
  }
  `,
  `
  type ModifyTodoTitleCommandHandlerResponse = Either<
    void,
    DomainErrors.TitleOutOfBoundsError | Application.Repo.Errors.Unexpected
  >;
  
  export class ModifyTodoTitleHandler
    implements
      Application.IUseCase<
        ModifyTodoTitleCommand,
        Promise<ModifyTodoTitleCommandHandlerResponse>
      >
  {
    constructor(
      @Inject(TodoWriteRepoPortToken)
      private readonly todoRepo: TodoWriteRepoPort,
    ) {}
  
    get command() {
      return ModifyTodoTitleCommand;
    }
  
    get boundedContext() {
      return 'Todo';
    }
  
    @Traceable({
      operation: '[Todo] ModifyTitleCommandHandler',
      serviceName: 'Todo',
      metrics: {
        name: '[Todo] ModifyTitleCommandHandler',
        category: 'commandHandler',
      },
    })
    async execute(
      command: ModifyTodoTitleCommand,
    ): Promise<ModifyTodoTitleCommandHandlerResponse> {
      const requestId = new Domain.UUIDv4(command.id);
      const todoFound = await this.todoRepo.getById(requestId);
      if (todoFound.isFail()) {
        return fail(todoFound.value);
      }
  
      if (!todoFound.value) {
        return fail(
          new ApplicationErrors.TodoNotFoundError(command.id.toString()),
        );
      }
  
      const titleToUpdate = TitleVO.create({ title: command.title });
      if (titleToUpdate.isFail()) {
        return fail(titleToUpdate.value);
      }
  
      todoFound.value.modifyTitle(titleToUpdate.value);
      const updateResult = await this.todoRepo.update(todoFound.value);
      if (updateResult.isFail()) {
        return fail(updateResult.value);
      }
  
      return ok();
    }
  }
  `,
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
  `
export type TModifyTodoTitleCommand = {
  id: string;
  title: string;
};
export class ModifyTodoTitleCommand extends Application.Command {
  public readonly id: string;
  public readonly title: string;

  constructor(modifyTitleTodo: TModifyTodoTitleCommand) {
    super('Todo');
    this.id = modifyTitleTodo.id;
    this.title = modifyTitleTodo.title;
  }
}`,
];
const QUERIES = [
  ` export class GetTodosQuery extends Application.Query {
  cnstructor() {
    super('Todo');
  }
}`,
];
const messageInstructions = (
  packageName: string,
  serviceName: string,
  handlers: string[],
  commands: string[],
  queries: string[],
  entities: string[],
): string => {
  // console.log(packageName);
  const truncatedEntities = [];
  for (const entity of entities) {
    const entityTruncationIndex = entity.indexOf('extends Domain');
    const truncatedEntity = CodeSnippets.sanitizeTypescriptImports(
      entity.slice(0, entityTruncationIndex),
    );
    truncatedEntities.push(truncatedEntity);
  }

  return ` 
  Create a protobuff file using the proto3 syntax. The name of the package is ${packageName}.
  The service name is ${serviceName}. 
  Below are the command and query handlers.
  ${CodeSnippets.openTypescript()}
  ${handlers
    .map((h) => {
      const index = h.indexOf(' implements');
      const res = h.slice(0, index);
      return res;
    })
    .join('\n')}
  ${CodeSnippets.closeTypescript()}
  And their respective command and queries.
  ${CodeSnippets.openTypescript()}
  ${commands.join('\n')}
  ${queries.join('\n')}
  ${CodeSnippets.closeTypescript()}
  Each command/query handler will have a defined rpc.
  The Either response will be represented as following
  ${CodeSnippets.openProto()}
  message <ResponseMessageName> {
    oneof result {
      <rpc-name>OKResponse ok = 1;
      <rpc-name>ErrorResponse error = 2;
    }
  }

  message ErrorResponse {
    string code = 1;
    string message = 2;
  }
  ${CodeSnippets.closeProto()}
  Ignore the error response of each handler and add only the systemUnavailableError key.
  You also need to add the ErrorResponse message.
  Create one rpc per handler(command or query)
  The Error Response of each handler will have only one key, the systemUnavailableError.
  ErrorResponse systemUnavailableError = 1;
  
  You can create the Entity Message and its props using the primitives of these Entities
  ${CodeSnippets.openTypescript()}
  ${truncatedEntities.join('\n')}
  ${CodeSnippets.closeTypescript()}

  Remove the Entity suffix when naming the message.
`;
  // TODO Fix this, primitives type now is not complete since it has other types inside it
};
const TODO_ENTITY = [
  `
type TTodoEntityPrimitives = {
  id: string;
  userId: {
    id: string;
  };
  title: {
    title: string;
  };
  completed: boolean;
};

export class TodoEntity extends Domain.Aggregate<TodoProps> {

}
`,
];
export const promptProtoMessages = (
  packageName: string,
  serviceName: string,
  handlers: string[],
  commands: string[],
  queries: string[],
  entities: string[],
): ChatCompletionRequestMessage[] => [
  {
    role: 'system',
    content:
      'You generate a protobuff file for a service written in typescript. The service is implemented with CQRS. You respond with code only.',
  },
  {
    role: 'user',
    content: messageInstructions(
      packageName,
      serviceName,
      HANDLERS,
      COMMANDS,
      QUERIES,
      TODO_ENTITY,
    ),
  },
  {
    role: 'assistant',
    content: `
  '''proto
  syntax = "proto3";

package todo;

service TodoService {
	rpc Add(AddTodoRequest) returns (AddTodoResponse);
  rpc Complete (CompleteTodoRequest) returns (CompleteTodoResponse);
  rpc ModifyTitle (ModifyTitleTodoRequest) returns (ModifyTitleTodoResponse);
	rpc GetAll(GetAllTodosRequest) returns (GetAllTodosResponse);
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
'''
  `,
  },
  {
    role: 'user',
    content: messageInstructions(packageName, serviceName, handlers, commands, queries, entities),
  },
];
