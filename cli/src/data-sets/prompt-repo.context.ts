import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from './common/system.message.js';

const DEFAULT_PORT = `import { Application, Domain, Either } from '@bitloops/bl-boilerplate-core';
import { EmailVO } from '../domain/email.value-object.js';
import { UserEntity } from '../domain/user.entity.js';

export interface UserWriteRepoPort
  extends Application.Repo.ICRUDWritePort<UserEntity, Domain.UUIDv4> {
  getByEmail(
    email: EmailVO,
  ): Promise<Either<UserEntity | null, Application.Repo.Errors.Unexpected>>;
}
`;

export const promptRepoMessages: (port?: string) => ChatCompletionRequestMessage[] = (
  port = DEFAULT_PORT,
) => [
  promptContextMessage,
  {
    role: 'user',
    content: `Generate the repo adapter for the following write repo port
    ---
    import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { TodoEntity } from '../domain/todo.entity.js';

export type TodoWriteRepoPort = Application.Repo.ICRUDWritePort<
  TodoEntity,
  Domain.UUIDv4
>;
---
Where Application.Repo.ICRUDWritePort is
---
export interface CRUDWriteRepoPort<Aggregate, AggregateId> {
  getById(aggregateRootId: AggregateId): Promise<Either<Aggregate | null, UnexpectedError>>;
  save(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
  update(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
  delete(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
}
---
The repository should be a mongodb one.  You can assume the mongodb client should be injected.
Let's think step by step.
`,
  },
  {
    role: 'assistant',
    content: `
  '''typescript
  import {
    Application,
    Domain,
    Either,
    Infra,
    asyncLocalStorage,
    ok,
  } from '@bitloops/bl-boilerplate-core';
  import { Injectable, Inject } from '@nestjs/common';
  import { Collection, MongoClient } from 'mongodb';
  import * as jwtwebtoken from 'jsonwebtoken';
  import { TodoWriteRepoPort } from '@src/lib/bounded-contexts/todo/todo/ports/todo-write.repo-port';
  import { TodoEntity } from '@src/lib/bounded-contexts/todo/todo/domain/todo.entity';
  import { ConfigService } from '@nestjs/config';
  import { AuthEnvironmentVariables } from '@src/config/auth.configuration';
  import { StreamingDomainEventBusToken } from '@src/lib/bounded-contexts/todo/todo/constants';
  
  const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'todo';
  const MONGO_DB_TODO_COLLECTION =
    process.env.MONGO_DB_TODO_COLLECTION || 'todos';
  
  @Injectable()
  export class TodoWriteRepository implements TodoWriteRepoPort {
    private collectionName = MONGO_DB_TODO_COLLECTION;
    private dbName = MONGO_DB_DATABASE;
    private collection: Collection;
    private JWT_SECRET: string;
  
    constructor(
      @Inject('MONGO_DB_CONNECTION') private client: MongoClient,
      @Inject(StreamingDomainEventBusToken)
      private readonly domainEventBus: Infra.EventBus.IEventBus,
      private configService: ConfigService<AuthEnvironmentVariables, true>,
    ) {
      this.collection = this.client
        .db(this.dbName)
        .collection(this.collectionName);
  
      this.JWT_SECRET = this.configService.get('jwtSecret', { infer: true });
    }
  
    @Application.Repo.Decorators.ReturnUnexpectedError()
    async getById(
      id: Domain.UUIDv4,
    ): Promise<Either<TodoEntity | null, Application.Repo.Errors.Unexpected>> {
      const ctx = asyncLocalStorage.getStore()?.get('context');
      const { jwt } = ctx;
      let jwtPayload: null | any = null;
      try {
        jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
      } catch (err) {
        throw new Error('Invalid JWT!');
      }
      const result = await this.collection.findOne({
        _id: id.toString() as any,
      });
  
      if (!result) {
        return ok(null);
      }
  
      if (result.userId.id !== jwtPayload.sub) {
        throw new Error('Invalid userId');
      }
  
      const { _id, ...todo } = result as any;
      return ok(
        TodoEntity.fromPrimitives({
          ...todo,
          id: _id.toString(),
        }),
      );
    }
  
    @Application.Repo.Decorators.ReturnUnexpectedError()
    async update(
      todo: TodoEntity,
    ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
      const ctx = asyncLocalStorage.getStore()?.get('context');
      const { jwt } = ctx;
      let jwtPayload: null | any = null;
      try {
        jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
      } catch (err) {
        throw new Error('Invalid JWT!');
      }
      const deletedTodo = todo.toPrimitives();
      if (deletedTodo.userId.id !== jwtPayload.sub) {
        throw new Error('Unauthorized userId');
      }
      const { id, userId, ...todoInfo } = todo.toPrimitives();
      await this.collection.updateOne(
        {
          _id: id as any,
          userId: userId,
        },
        {
          $set: todoInfo,
        },
      );
      this.domainEventBus.publish(todo.domainEvents);
      return ok();
    }
  
    @Application.Repo.Decorators.ReturnUnexpectedError()
    async delete(
      todo: TodoEntity,
    ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
      const ctx = asyncLocalStorage.getStore()?.get('context');
      const { jwt } = ctx;
      let jwtPayload: null | any = null;
      try {
        jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
      } catch (err) {
        throw new Error('Invalid JWT!');
      }
      const deletedTodo = todo.toPrimitives();
      if (deletedTodo.userId.id !== jwtPayload.sub) {
        throw new Error('Unauthorized userId');
      }
      const { id, userId } = deletedTodo;
      await this.collection.deleteOne({
        _id: id as any,
        userId,
      });
      this.domainEventBus.publish(todo.domainEvents);
      return ok();
    }
  
    @Application.Repo.Decorators.ReturnUnexpectedError()
    async save(
      todo: TodoEntity,
    ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
      const ctx = asyncLocalStorage.getStore()?.get('context');
      const { jwt } = ctx;
      let jwtPayload: null | any = null;
      try {
        jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
      } catch (err) {
        throw new Error('Invalid JWT!');
      }
      const createdTodo = todo.toPrimitives();
      if (createdTodo.userId.id !== jwtPayload.sub) {
        throw new Error('Unauthorized userId');
      }
      const { id, ...todoInfo } = createdTodo;
      await this.collection.insertOne({
        _id: id as any,
        id: id,
        ...todoInfo,
      });
      this.domainEventBus.publish(todo.domainEvents);
      return ok();
    }
  }
  '''
  The user token is validated before and after allowing certain database operations.
    `,
  },
  {
    role: 'user',
    content: `
    Generate a repo adapter for the following read repo port
    import { Application } from '@bitloops/bl-boilerplate-core';
import { TTodoReadModelSnapshot } from '../domain/todo.read-model.js';

export type TodoReadRepoPort =
  Application.Repo.ICRUDReadPort<TTodoReadModelSnapshot>;
  `,
  },
  {
    role: 'assistant',
    content: `
    '''typescript
import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import * as jwtwebtoken from 'jsonwebtoken';
import { TodoReadRepoPort } from '@src/lib/bounded-contexts/todo/todo/ports/todo-read.repo-port';
import {
  TodoReadModel,
  TTodoReadModelSnapshot,
} from '@src/lib/bounded-contexts/todo/todo/domain/todo.read-model';
import { ConfigService } from '@nestjs/config';
import { AuthEnvironmentVariables } from '@src/config/auth.configuration';
import {
  Application,
  asyncLocalStorage,
  Either,
  ok,
} from '@bitloops/bl-boilerplate-core';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'todo';
const MONGO_DB_TODO_COLLECTION =
  process.env.MONGO_DB_TODO_COLLECTION || 'todos';

@Injectable()
export class TodoReadRepository implements TodoReadRepoPort {
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Collection;
  private JWT_SECRET: string;

  constructor(
    @Inject('MONGO_DB_CONNECTION') private client: MongoClient,
    private configService: ConfigService<AuthEnvironmentVariables, true>,
  ) {
    this.collection = this.client
      .db(this.dbName)
      .collection(this.collectionName);
    this.JWT_SECRET = this.configService.get('jwtSecret', { infer: true });
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async getById(
    id: string,
  ): Promise<Either<TodoReadModel | null, Application.Repo.Errors.Unexpected>> {
    throw new Error('Method not implemented.');
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async getAll(): Promise<
    Either<TTodoReadModelSnapshot[], Application.Repo.Errors.Unexpected>
  > {
    const ctx = asyncLocalStorage.getStore()?.get('context');
    const { jwt } = ctx;
    let jwtPayload: null | any = null;
    try {
      jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
    } catch (err) {
      throw new Error('Invalid JWT!');
    }
    const userId = jwtPayload.sub;
    if (!userId) {
      throw new Error('Invalid userId');
    }
    const todos = await this.collection
      .find({ userId: { id: userId } })
      .toArray();
    return ok(
      todos.map((todo) => {
        const res = {
          id: todo._id.toString(),
          userId: todo.userId.id,
          title: todo.title.title,
          completed: todo.completed,
        };
        return res;
      }),
    );
  }
}
'''
`,
  },
  {
    role: 'user',
    content: `
    Generate a repo adapter for the following port
    '''typescript
    ${port}
    '''
    `,
  },
];
