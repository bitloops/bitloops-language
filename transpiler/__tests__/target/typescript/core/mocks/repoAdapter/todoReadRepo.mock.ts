import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { TodoReadRepoPort } from '../../ports/TodoReadRepoPort';
import { TodoReadModel } from '../../domain/TodoReadModel';
export class MongoTodoReadRepo implements TodoReadRepoPort {
  private collection: Mongo.Collection;
  constructor(private client: Mongo.Client) {
    const dbName = process.env.MONGO_DB_TODO_COLLECTION || 'todos';
    const collection = process.env.MONGO_DB_TODO_COLLECTION || 'todos';
    this.collection = this.client.db(dbName).collection(collection);
  }
  async getAll(): Promise<TodoReadModel[]> {
    const documents = await this.collection.find({}).toArray();
    const res: TodoReadModel[] = [];
    documents.forEach((document) => {
      res.push({
        id: document._id.toString(),
        name: document.name,
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
        name: document.name,
      };
    }
    return res;
  }
}
