import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from './common/system.message.js';
import { ContextInfo } from '../../../types.js';

const _DEFAULT_PORT = `import { Application } from '@bitloops/bl-boilerplate-core';
import { TTodoReadModelSnapshot } from '../domain/todo.read-model.js';

export type TodoReadRepoPort =
  Application.Repo.ICRUDReadPort<TTodoReadModelSnapshot>;
`;

const TEST_PORT = `import { Application } from '@bitloops/bl-boilerplate-core';
import { TCarsReadModelSnapshot } from '../domain/cars.read-model.js';
export type CarsReadRepoPort = Application.Repo.ICRUDReadPort<TCarsReadModelSnapshot>;
`;

const messageInstructions = (bc: string, mod: string): string => {
  return `
  The bounded context is ${bc} and the module is ${mod}. You use them as part of the import paths when necessary.
The repository should be a mongodb one.  You can assume the mongodb client should be injected.
The method getAll should read the ctx(user context) from asyncLocalStorage,
and verify that the jwt token is valid, and the userId is allowed to run the respective method.
You should use \`import * as jwtwebtoken from 'jsonwebtoken';\`
`;
};

export const promptReadRepoMessages: (
  port: string,
  contextInfo: ContextInfo,
) => ChatCompletionRequestMessage[] = (port = TEST_PORT, contextInfo) => {
  const { boundedContext, module } = contextInfo;

  return [
    promptContextMessage,
    {
      role: 'user',
      content: `
    Generate a repo adapter for the following read repo port
'''typescript
    import { Application } from '@bitloops/bl-boilerplate-core';
import { TTodoReadModelSnapshot } from '../domain/todo.read-model.js';

export type TodoReadRepoPort =
  Application.Repo.ICRUDReadPort<TTodoReadModelSnapshot>;
'''
Where the ICrudReadPort is
'''typescript
export interface CRUDReadRepoPort<ReadModel> {
  getAll(): Promise<Either<ReadModel[] | null, UnexpectedError>>;
  getById(id: string): Promise<Either<ReadModel | null, UnexpectedError>>;
}
'''
${messageInstructions('todo', 'todo')}
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
    Generate a repo adapter for the following read repo port
'''typescript
import { Application, Either } from '@bitloops/bl-boilerplate-core';
import { NotificationTemplateReadModel } from '../domain/notification-template.read-model';

export interface NotificationTemplateReadRepoPort
  extends Application.Repo.ICRUDReadPort<NotificationTemplateReadModel> {
  getByType(
    type: string,
  ): Promise<
    Either<
      NotificationTemplateReadModel | null,
      Application.Repo.Errors.Unexpected
    >
  >;
}
'''
${messageInstructions('marketing', 'marketing')}
  `,
    },

    {
      role: 'assistant',
      content: `
    '''typescript
    import { Injectable, Inject } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import * as jwtwebtoken from 'jsonwebtoken';
import { NotificationTemplateReadRepoPort } from '@src/lib/bounded-contexts/marketing/marketing/ports/notification-template-read.repo-port';
import { NotificationTemplateReadModel } from '@src/lib/bounded-contexts/marketing/marketing/domain/notification-template.read-model';
import { AuthEnvironmentVariables } from '@src/config/auth.configuration';
import { ConfigService } from '@nestjs/config';
import {
  Application,
  Either,
  asyncLocalStorage,
  ok,
} from '@bitloops/bl-boilerplate-core';

@Injectable()
export class NotificationTemplateReadRepository
  implements NotificationTemplateReadRepoPort
{
  private collectionName =
    process.env.MONGO_DB_TODO_COLLECTION || 'notificationTemplates';
  private dbName = process.env.MONGO_DB_DATABASE || 'marketing';
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
  async getByType(
    type: string,
  ): Promise<
    Either<
      NotificationTemplateReadModel | null,
      Application.Repo.Errors.Unexpected
    >
  > {
    const ctx = asyncLocalStorage.getStore()?.get('context');
    const { jwt } = ctx;
    let jwtPayload: null | any = null;
    try {
      jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
    } catch (err) {
      throw new Error('Invalid JWT!');
    }
    const result = await this.collection.findOne({
      type,
    });

    if (!result) {
      return ok(null);
    }

    const { _id, ...todo } = result as any;
    return ok(
      NotificationTemplateReadModel.fromPrimitives({
        ...todo,
        id: _id.toString(),
      }),
    );
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async getAll(): Promise<
    Either<
      NotificationTemplateReadModel[] | null,
      Application.Repo.Errors.Unexpected
    >
  > {
    throw new Error('Method not implemented');
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async getById(
    id: string,
  ): Promise<
    Either<
      NotificationTemplateReadModel | null,
      Application.Repo.Errors.Unexpected
    >
  > {
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

    if (result.userId !== jwtPayload.sub) {
      throw new Error('Invalid userId');
    }

    const { _id, ...todo } = result as any;
    return ok(
      NotificationTemplateReadModel.fromPrimitives({
        ...todo,
        id: _id.toString(),
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
    Generate a repo adapter for the following read repo port
    '''typescript
    ${port}
    '''
    ${messageInstructions(boundedContext, module)}
    `,
    },
  ];
};
