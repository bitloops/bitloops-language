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
  async getById(todoId: Domain.UUIDv4): Promise<TodoEntity> {
    return (await this.collection.findOne({
      _id: todoId.toString(),
    })) as unknown as TodoEntity;
  }
  async delete(todoId: Domain.UUIDv4): Promise<void> {
    await this.collection.deleteOne({
      _id: todoId.toString(),
    });
  }
  async save(todo: TodoEntity): Promise<void> {
    await this.collection.insertOne({
      _id: todo.id.toString() as unknown as Mongo.ObjectId,
      completed: todo.completed,
      title: todo.title.title,
    });
  }
  async update(todo: TodoEntity): Promise<void> {
    await this.collection.updateOne(
      {
        _id: todo.id.toString(),
      },
      {
        $set: {
          completed: todo.completed,
          title: todo.title.title,
        },
      },
    );
  }
}
