
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
      import { TodoEntity } from '@lib/bounded-contexts/todo/todo/domain/todo.entity';
      import { TodoWriteRepoPort } from '@lib/bounded-contexts/todo/todo/ports/todo-write.repo-port';
      import { StreamingDomainEventBusToken } from '@lib/bounded-contexts/todo/todo/constants';
      
      const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'todo';
      const MONGO_DB_TODO_COLLECTION =
        process.env.MONGO_DB_TODO_COLLECTION || 'todos';
      
      @Injectable()
      export class MongoTodoWriteRepository implements TodoWriteRepoPort {
        private collectionName = MONGO_DB_TODO_COLLECTION;
        private dbName = MONGO_DB_DATABASE;
        private collection: Collection;
      
        constructor(
          @Inject('MONGO_DB_CONNECTION') private client: MongoClient,
          @Inject(StreamingDomainEventBusToken)
          private readonly domainEventBus: Infra.EventBus.IEventBus,
        ) {
          this.collection = this.client
            .db(this.dbName)
            .collection(this.collectionName);
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async getById(
          id: Domain.UUIDv4,
        ): Promise<Either<TodoEntity | null, Application.Repo.Errors.Unexpected>> {
          const result = await this.collection.findOne({
            _id: id.toString() as any,
          });
      
          if (!result) {
            return ok(null);
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
          const { id, ...todoInfo } = todo.toPrimitives();
          await this.collection.updateOne(
            {
              _id: id as any,
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
          const { id } = todo.toPrimitives();
          await this.collection.deleteOne({
            _id: id as any,
          });
      
          this.domainEventBus.publish(todo.domainEvents);
          return ok();
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async save(
          todo: TodoEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const { id, ...todoInfo } = todo.toPrimitives();
          await this.collection.insertOne({
            _id: id as any,
            ...todoInfo,
          });
      
          this.domainEventBus.publish(todo.domainEvents);
          return ok();
        }
      }
      