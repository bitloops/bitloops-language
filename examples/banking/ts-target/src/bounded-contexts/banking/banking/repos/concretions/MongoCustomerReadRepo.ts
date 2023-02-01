import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { CustomerReadModel } from '../../domain/CustomerReadModel';
import { ICustomerReadRepo } from '../interfaces/ICustomerReadRepo';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'banking';
const MONGO_DB_TODO_COLLECTION = process.env.MONGO_DB_TODO_COLLECTION || 'customers';

export class MongoCustomerReadRepo implements ICustomerReadRepo {
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Mongo.Collection;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  async getAll(): Promise<CustomerReadModel[]> {
    const documents = await this.collection.find({}).toArray();
    const res: CustomerReadModel[] = [];
    documents.forEach((document) => {
      res.push({
        id: document._id.toString(),
        email: document.email,
        accountId: document.accountId,
      });
    });
    return res;
  }

  async getById(todoId: string): Promise<CustomerReadModel | null> {
    const document = await this.collection.findOne({
      _id: todoId,
    });
    if (!document) {
      return null;
    }
    return {
      id: document._id.toString(),
      email: document.email,
      accountId: document.accountId,
    };
  }
}
