import { Application } from '@bitloops/bl-boilerplate-core';
import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { TodoReadModel } from '../../domain/TodoReadModel';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'todo';
const MONGO_DB_TODO_COLLECTION = process.env.MONGO_DB_TODO_COLLECTION || 'todos';

export class MongoTodoReadRepo implements Application.Repo.ICRUDReadPort<TodoReadModel> {
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Mongo.Collection;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  async getAll(): Promise<TodoReadModel[]> {
    const documents = await this.collection.find({}).toArray();
    const res: TodoReadModel[] = [];
    documents.forEach((document) => {
      res.push({
        id: document._id.toString(),
        title: document.title,
        completed: document.completed,
      });
    });
    return res;
  }

  async getById(todoId: string): Promise<TodoReadModel> {
    const document = await this.collection.findOne({
      _id: todoId,
    });
    let res = null;
    if (document) {
      res = {
        id: document._id.toString(),
        title: document.title,
        completed: document.completed,
      };
    }
    return res;
  }
}
