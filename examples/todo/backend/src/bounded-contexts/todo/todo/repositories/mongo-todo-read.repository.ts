
import { Injectable, Inject } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import * as jwtwebtoken from 'jsonwebtoken';
import { TodoReadRepoPort } from '@lib/bounded-contexts/todo/todo/ports/todo-read.repo-port';
import { TodoReadModel } from '@lib/bounded-contexts/todo/todo/domain/todo.read-model';
import { AuthEnvironmentVariables } from '@src/config/auth.configuration';
import { ConfigService } from '@nestjs/config';
import {
  Application,
  Either,
  asyncLocalStorage,
  ok,
} from '@bitloops/bl-boilerplate-core';

@Injectable()
export class MongoTodoReadRepository implements TodoReadRepoPort {
  private collectionName = process.env.MONGO_DB_TODO_COLLECTION || 'todos';
  private dbName = process.env.MONGO_DB_DATABASE || 'todo';
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
  ): Promise<
    Either<TodoReadModel | null, Application.Repo.Errors.Unexpected>
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
      TodoReadModel.fromPrimitives({
        ...todo,
        id: _id.toString(),
      }),
    );
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async getAll(): Promise<
    Either<TodoReadModel[], Application.Repo.Errors.Unexpected>
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
    