import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { TodoWriteRepoPort } from '../../ports/TodoWriteRepoPort';
import { TodoEntity } from '../../domain/TodoEntity';
import { Domain } from '@bitloops/bl-boilerplate-core';
export class MongoTodoWriteRepo implements TodoWriteRepoPort {
  private collection: Mongo.Collection;
  constructor(private client: Mongo.Client) {
    const dbName = process.env.MONGO_DB_TODO_COLLECTION || 'todos';
    const collection = process.env.MONGO_DB_TODO_COLLECTION || 'todos';
    this.collection = this.client.db(dbName).collection(collection);
  }
  async getAll(): Promise<TodoEntity[]> {
    throw new Error('Method not implemented.');
  }
  async getById(todoId: Domain.UUIDv4): Promise<TodoEntity | null> {
    const res = await this.collection.findOne({
      _id: todoId.toString(),
    });
    if (!res) {
      return null;
    }
    const { _id, ...rest } = res as any;
    return TodoEntity.fromPrimitives({
      id: _id,
      ...rest,
    });
  }
  async delete(todoId: Domain.UUIDv4): Promise<void> {
    await this.collection.deleteOne({
      _id: todoId.toString(),
    });
  }
  async save(todo: TodoEntity): Promise<void> {
    const { id, ...rest } = todo.toPrimitives();
    await this.collection.insertOne({
      _id: id as unknown as Mongo.ObjectId,
      ...rest,
    });
    await Domain.dispatchEventsCallback(todo.id);
  }
  async update(todo: TodoEntity): Promise<void> {
    const { id, ...rest } = todo.toPrimitives();
    await this.collection.updateOne(
      {
        _id: id,
      },
      {
        $set: rest,
      },
    );
    await Domain.dispatchEventsCallback(todo.id);
  }
  async getByCompleted(completed: boolean): Promise<TodoEntity | null> {
    const res = await this.collection.findOne({
      completed,
    });
    if (!res) {
      return null;
    }
    const { _id, ...rest } = res;
    return TodoEntity.fromPrimitives({
      id: _id,
      ...rest,
    });
  }
  async getByTitle(title: string): Promise<TodoEntity | null> {
    const res = await this.collection.findOne({
      title,
    });
    if (!res) {
      return null;
    }
    const { _id, ...rest } = res;
    return TodoEntity.fromPrimitives({
      id: _id,
      ...rest,
    });
  }
}
