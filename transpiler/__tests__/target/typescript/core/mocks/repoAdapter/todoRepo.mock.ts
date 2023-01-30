import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { TodoRepoPort } from '../../ports/TodoRepoPort';
import { TodoRootEntity } from '../../domain/TodoRootEntity';
import { Domain } from '@bitloops/bl-boilerplate-core';
export class MongoTodoRepo implements TodoRepoPort {
  private collection: Mongo.Collection;
  constructor(private client: Mongo.Client) {
    const dbName = 'todo';
    const collection = 'todos';
    this.collection = this.client.db(dbName).collection(collection);
  }
  async getAll(): Promise<TodoRootEntity[]> {
    throw new Error('Method not implemented.');
  }
  async getById(todoRootId: Domain.UUIDv4): Promise<TodoRootEntity> {
    return (await this.collection.findOne({
      _id: todoRootId.toString(),
    })) as unknown as TodoRootEntity;
  }
  async delete(todoRootId: Domain.UUIDv4): Promise<void> {
    await this.collection.deleteOne({
      _id: todoRootId.toString(),
    });
  }
  async save(todoRoot: TodoRootEntity): Promise<void> {
    await this.collection.insertOne({
      _id: todoRoot.id.toString() as unknown as Mongo.ObjectId,
      completed: todoRoot.completed,
    });
  }
  async update(todoRoot: TodoRootEntity): Promise<void> {
    await this.collection.updateOne(
      {
        _id: todoRoot.id.toString(),
      },
      {
        $set: {
          completed: todoRoot.completed,
        },
      },
    );
  }
}
