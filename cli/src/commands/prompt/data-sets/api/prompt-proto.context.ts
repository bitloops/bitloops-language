import { ChatCompletionRequestMessage } from 'openai';

const HANDLERS = [
  `
  type AddTodoUseCaseResponse = Either<
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
    async execute(command: AddTodoCommand): Promise<AddTodoUseCaseResponse> {
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
  type CompleteTodoUseCaseResponse = Either<
    void,
    DomainErrors.TodoAlreadyCompletedError | ApplicationErrors.TodoNotFoundError
  >;
  
  export class CompleteTodoHandler
    implements
      Application.IUseCase<
        CompleteTodoCommand,
        Promise<CompleteTodoUseCaseResponse>
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
    ): Promise<CompleteTodoUseCaseResponse> {
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
  type ModifyTodoTitleResponse = Either<
    void,
    DomainErrors.TitleOutOfBoundsError | Application.Repo.Errors.Unexpected
  >;
  
  export class ModifyTodoTitleHandler
    implements
      Application.IUseCase<
        ModifyTodoTitleCommand,
        Promise<ModifyTodoTitleResponse>
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
    ): Promise<ModifyTodoTitleResponse> {
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

  // `
  // type UncompleteTodoUseCaseResponse = Either<
  //   void,
  //   DomainErrors.TodoAlreadyUncompletedError | ApplicationErrors.TodoNotFoundError
  // >;

  // export class UncompleteTodoHandler
  //   implements
  //     Application.IUseCase<
  //       UncompleteTodoCommand,
  //       Promise<UncompleteTodoUseCaseResponse>
  //     >
  // {
  //   get command() {
  //     return UncompleteTodoCommand;
  //   }

  //   get boundedContext() {
  //     return 'Todo';
  //   }
  //   constructor(
  //     @Inject(TodoWriteRepoPortToken)
  //     private readonly todoRepo: TodoWriteRepoPort,
  //   ) {}

  //   @Traceable({
  //     operation: '[Todo] UncompleteTodoCommandHandler',
  //     serviceName: 'Todo',
  //     metrics: {
  //       name: '[Todo] UncompleteTodoCommandHandler',
  //       category: 'commandHandler',
  //     },
  //   })
  //   async execute(
  //     command: UncompleteTodoCommand,
  //   ): Promise<UncompleteTodoUseCaseResponse> {
  //     const todo = await this.todoRepo.getById(new Domain.UUIDv4(command.id));
  //     if (todo.isFail()) {
  //       return fail(todo.value);
  //     }
  //     if (!todo.value) {
  //       return fail(new ApplicationErrors.TodoNotFoundError(command.id));
  //     }

  //     const uncompletedOrError = todo.value.uncomplete();
  //     if (uncompletedOrError.isFail()) {
  //       return fail(uncompletedOrError.value);
  //     }
  //     const saveResult = await this.todoRepo.update(todo.value);
  //     if (saveResult.isFail()) {
  //       return fail(saveResult.value);
  //     }
  //     return ok();
  //   }
  // }
  // `
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
  ` export type TDeleteTodoCommand = {
  id: string;
};

export class DeleteTodoCommand extends Application.Command {
  public id: string;

  constructor(props: TDeleteTodoCommand) {
    super('Todo');
    this.id = props.id;
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
  `
export type TUncompleteTodoCommand = {
  id: string;
};

export class UncompleteTodoCommand extends Application.Command {
  public id: string;

  constructor(props: TUncompleteTodoCommand) {
    super('Todo');
    this.id = props.id;
  }
}
`,
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
  entity: string,
): string => {
  console.log('INSERTED MessageInstructions');
  console.log(packageName);
  console.log({
    commandsLength: commands.length,
    handlersLength: handlers.length,
  });
  const entityTruncationIndex = entity.indexOf('  extends Domain.Aggregate');
  const truncatedEntity = entity.slice(0, entityTruncationIndex);

  return ` 
  Create a protobuff file using the proto3 syntax. The name of the package is ${packageName}.
  The service name is ${serviceName}. 
  Below are the command and query handlers.
  '''typescript
  ${handlers
    .map((h) => {
      const index = h.indexOf(' implements');
      console.log('index', index);
      const res = h.slice(0, index);
      console.log('res', res);
      return res;
    })
    .join('\n')}
  '''
  And their respective command and queries.
  '''typescript
  ${commands.join('\n')}
  ${queries.join('\n')}
  '''
  Each command/query handler will have a defined rpc.
  The Either response will be represented as following
  '''proto
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
  '''
  Create one rpc per handler(command or query)
  If there are any commands or queries not corresponding to a handler, do not implement their rpcs.
  
  You can create the Entity Message and its props using the primitives of this Entity
  '''typescript
  ${truncatedEntity}
  '''
`;
};
const TODO_ENTITY = `export interface TodoProps {
  userId: UserIdVO;
  id?: Domain.UUIDv4;
  title: TitleVO;
  completed: boolean;
}

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
`;
const TEST_TODO_ENTITY = `export interface TestTodoProps {
  userId: UserIdVO;
  id?: Domain.UUIDv4;
  title: TitleVO;
  checked: boolean;
}

type TTestTodoEntityPrimitives = {
  id: string;
  userId: {
    id: string;
  };
  title: {
    title: string;
  };
  checked: boolean;
};

`;
export const promptProtoMessages = (
  packageName = 'todo',
  serviceName = 'TodoService',
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
  rpc Uncomplete (UncompleteTodoRequest) returns (UncompleteTodoResponse);
  rpc ModifyTitle (ModifyTitleTodoRequest) returns (ModifyTitleTodoResponse);
  rpc Delete (DeleteTodoRequest) returns (DeleteTodoResponse);
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

message DeleteTodoOKResponse {}

message DeleteTodoRequest {
  string id = 1;
}

message DeleteTodoResponse {
  oneof result {
    DeleteTodoOKResponse ok = 1;
    DeleteTodoErrorResponse error = 2;
  }
}

message DeleteTodoErrorResponse {
  oneof error {
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse todoAlreadyExistsError = 3;
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
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
  }
}

message GetAllTodosOKResponse {
  repeated Todo todos = 1;
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
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse todoDoesNotExistError = 3;
    ErrorResponse invalidTitleLengthError = 4;
  }
}

message ModifyTitleTodoOKResponse {}

message UncompleteTodoRequest {
  string id = 1;
}

message UncompleteTodoResponse {
  oneof result {
    UncompleteTodoOKResponse ok = 1;
    UncompleteTodoErrorResponse error = 2;
  }
}

message UncompleteTodoErrorResponse {
  oneof error {
    ErrorResponse unauthorizedError = 1;
    ErrorResponse systemUnavailableError = 2;
    ErrorResponse todoAlreadyExistsError = 3;
  }
}

message UncompleteTodoOKResponse {}
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
    content: messageInstructions(
      'testTodo',
      'TestTodoService',
      HANDLERS.slice(0, -2),
      COMMANDS.slice(0, -2),
      [],
      TEST_TODO_ENTITY,
    ),
  },
];
