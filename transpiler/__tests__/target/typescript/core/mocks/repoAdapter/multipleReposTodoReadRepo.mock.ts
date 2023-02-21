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
      const { _id, ...rest } = document;
      res.push(
        TodoReadModel.fromPrimitives({
          id: _id,
          ...rest,
        }),
      );
    });
    return res;
  }
  async getById(todoId: string): Promise<TodoReadModel | null> {
    const document = await this.collection.findOne({
      _id: todoId,
    });
    if (!document) {
      return null;
    }
    const { _id, ...rest } = document;
    return TodoReadModel.fromPrimitives({
      id: _id,
      ...rest,
    });
  }
}
