import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { TodoEntity } from '../../domain/TodoEntity';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'todo';
const MONGO_DB_TODO_COLLECTION = process.env.MONGO_DB_TODO_COLLECTION || 'todos';

export class MongoTodoWriteRepo
  implements Application.Repo.ICRUDWritePort<TodoEntity, Domain.UUIDv4>
{
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Mongo.Collection;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  async getById(todoId: Domain.UUIDv4): Promise<TodoEntity> {
    const res = await this.collection.findOne({
      _id: todoId.toString(),
    });
    return res as unknown as TodoEntity;
  }

  async delete(todoId: Domain.UUIDv4): Promise<void> {
    await this.collection.deleteOne({
      _id: todoId.toString(),
    });
  }

  async save(todo: TodoEntity): Promise<void> {
    await this.collection.insertOne({
      _id: todo.id.toString() as unknown as Mongo.ObjectId,
      title: todo.title.title,
      completed: todo.completed,
    });
  }

  async update(todo: TodoEntity): Promise<void> {
    await this.collection.updateOne(
      {
        _id: todo.id.toString(),
      },
      {
        $set: {
          title: todo.title.title,
          completed: todo.completed,
        },
      },
    );
  }
}
