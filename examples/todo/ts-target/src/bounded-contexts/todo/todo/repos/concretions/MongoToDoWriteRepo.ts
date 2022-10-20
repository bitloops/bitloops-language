import { Application } from '@bitloops/bl-boilerplate-core';
import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { Todo } from '../../domain/Todo';
import { TodoId } from '../../domain/TodoId';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'todo';
const MONGO_DB_TODO_COLLECTION = process.env.MONGO_DB_TODO_COLLECTION || 'todos';

export class MongoTodoWriteRepo implements Application.Repo.ICRUDWritePort<Todo, TodoId> {
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Mongo.Collection;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  async getById(todoId: TodoId): Promise<Todo> {
    return (await this.collection.find({
      _id: todoId.id.toString(),
    })) as unknown as Todo;
  }

  async delete(todoId: TodoId): Promise<void> {
    await this.collection.deleteOne({
      _id: todoId.id.toString(),
    });
  }

  async save(todo: Todo): Promise<void> {
    await this.collection.insertOne({
      _id: todo.id.toString() as unknown as Mongo.ObjectId,
      title: todo.title.title,
      completed: todo.completed,
    });
  }

  async update(todo: Todo): Promise<void> {
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
