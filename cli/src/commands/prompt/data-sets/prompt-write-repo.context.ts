import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from './common/system.message.js';
import { ContextInfo } from '../../../types.js';

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

export const promptWriteRepoMessages: (
  port: string,
  contextInfo: ContextInfo,
) => ChatCompletionRequestMessage[] = (port = DEFAULT_PORT, contextInfo) => {
  const { boundedContext, module } = contextInfo;

  const messageInstructions = (bc: string, mod: string): string => {
    return `
    The bounded context is ${bc} and the module is ${mod}. You use them as part of the import paths when necessary.
The repository should be a mongodb one.  You can assume the mongodb client should be injected.
The methods getById, update, save and delete should read the ctx(user context) from asyncLocalStorage,
and verify that the jwt token is valid, and the userId is allowed to run the respective method.
You should use \`import * as jwtwebtoken from 'jsonwebtoken';\`
`;
  };

  return [
    promptContextMessage,
    {
      role: 'user',
      content: `Generate the repo adapter for the following write repo port
    '''typescript
    import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { TodoEntity } from '../domain/todo.entity.js';

export type TodoWriteRepoPort = Application.Repo.ICRUDWritePort<
  TodoEntity,
  Domain.UUIDv4
>;
'''
Where Application.Repo.ICRUDWritePort is
'''typescript
export interface CRUDWriteRepoPort<Aggregate, AggregateId> {
  getById(aggregateRootId: AggregateId): Promise<Either<Aggregate | null, UnexpectedError>>;
  save(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
  update(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
  delete(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
}
'''
${messageInstructions('todo', 'todo')}
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
    Generate a repo adapter for the following write repo port
    '''typescript
    import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { UserEntity } from '../domain/user.entity';

export type UserWriteRepoPort = Application.Repo.ICRUDWritePort<
  UserEntity,
  Domain.UUIDv4
>;
Where Application.Repo.ICRUDWritePort is
'''typescript
export interface CRUDWriteRepoPort<Aggregate, AggregateId> {
  getById(aggregateRootId: AggregateId): Promise<Either<Aggregate | null, UnexpectedError>>;
  save(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
  update(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
  delete(aggregate: Aggregate): Promise<Either<void, UnexpectedError>>;
}
'''
${messageInstructions('marketing', 'marketing')}
`,
    },
    {
      role: 'assistant',
      content: `
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
      import { UserEntity } from '@src/lib/bounded-contexts/marketing/marketing/domain/user.entity';
      import { UserWriteRepoPort } from '@src/lib/bounded-contexts/marketing/marketing/ports/user-write.repo-port';
      import { ConfigService } from '@nestjs/config';
      import { AuthEnvironmentVariables } from '@src/config/auth.configuration';
      import { StreamingDomainEventBusToken } from '@src/lib/bounded-contexts/marketing/marketing/constants';
      
      const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'marketing';
      const MONGO_DB_TODO_COLLECTION =
        process.env.MONGO_DB_TODO_COLLECTION || 'users';
      
      @Injectable()
      export class UserWriteRepository implements UserWriteRepoPort {
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
        async update(
          user: UserEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const ctx = asyncLocalStorage.getStore()?.get('context');
          const { jwt } = ctx;
          let jwtPayload: null | any = null;
          try {
            jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
          } catch (err) {
            throw new Error('Invalid JWT!');
          }
          const userPrimitives = user.toPrimitives();
          if (userPrimitives.id !== jwtPayload.sub) {
            throw new Error('Unauthorized userId');
          }
          const { id, ...userInfo } = userPrimitives;
          await this.collection.updateOne(
            {
              _id: id as any,
            },
            {
              $set: userInfo,
            },
          );
      
          this.domainEventBus.publish(user.domainEvents);
          return ok();
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        delete(
          aggregate: UserEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          throw new Error('Method not implemented.');
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async getById(
          id: Domain.UUIDv4,
        ): Promise<Either<UserEntity | null, Application.Repo.Errors.Unexpected>> {
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
      
          if (result.id !== jwtPayload.sub) {
            throw new Error('Invalid userId');
          }
      
          const { _id, ...todo } = result as any;
          return ok(
            UserEntity.fromPrimitives({
              ...todo,
              id: _id.toString(),
            }),
          );
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async save(
          user: UserEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const createdUser = user.toPrimitives();
      
          await this.collection.insertOne({
            _id: createdUser.id as any,
            ...createdUser,
          });
      
          this.domainEventBus.publish(user.domainEvents);
          return ok();
        }
      }
      
      `,
    },
    {
      role: 'user',
      content: `
    Generate a repo adapter for the following write repo port
    '''typescript
    ${port}
    '''
    ${messageInstructions(boundedContext, module)}
    `,
    },
  ];
};
