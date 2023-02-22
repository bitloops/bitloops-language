import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { TodoWriteRepoPort } from '../../ports/TodoWriteRepoPort';
import { TodoRootEntity } from '../../domain/TodoRootEntity';
import { Domain } from '@bitloops/bl-boilerplate-core';
export class MongoTodoWriteRepo implements TodoWriteRepoPort {
  private collection: Mongo.Collection;
  constructor(private client: Mongo.Client) {
    const dbName = process.env.MONGO_DB_TODO_COLLECTION || 'todos';
    const collection = process.env.MONGO_DB_TODO_COLLECTION || 'todos';
    this.collection = this.client.db(dbName).collection(collection);
  }
  async getAll(): Promise<TodoRootEntity[]> {
    throw new Error('Method not implemented.');
  }
  async getById(todoRootId: Domain.UUIDv4): Promise<TodoRootEntity | null> {
    const res = await this.collection.findOne({
      _id: todoRootId.toString(),
    });
    if (!res) {
      return null;
    }
    const { _id, ...rest } = res;
    return TodoRootEntity.fromPrimitives({
      id: _id,
      ...rest,
    });
  }
  async delete(todoRootId: Domain.UUIDv4): Promise<void> {
    await this.collection.deleteOne({
      _id: todoRootId.toString(),
    });
  }
  async save(todoRoot: TodoRootEntity): Promise<void> {
    const { id, ...rest } = todoRoot.toPrimitives();
    await this.collection.insertOne({
      _id: id as unknown as Mongo.ObjectId,
      ...rest,
    });
    await Domain.dispatchEventsCallback(todoRoot.id);
  }
  async update(todoRoot: TodoRootEntity): Promise<void> {
    const { id, ...rest } = todoRoot.toPrimitives();
    await this.collection.updateOne(
      {
        _id: id,
      },
      {
        $set: rest,
      },
    );
    await Domain.dispatchEventsCallback(todoRoot.id);
  }
  async getByCompleted(completed: boolean): Promise<TodoRootEntity | null> {
    const res = await this.collection.findOne({
      completed,
    });
    if (!res) {
      return null;
    }
    const { _id, ...rest } = res;
    return TodoRootEntity.fromPrimitives({
      id: _id,
      ...rest,
    });
  }
}
