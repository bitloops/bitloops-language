import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { AccountReadModel } from '../../domain/AccountReadModel';
import { IAccountReadRepo } from '../interfaces/IAccountReadRepo';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'banking';
const MONGO_DB_TODO_COLLECTION = process.env.MONGO_DB_TODO_COLLECTION || 'accounts';

export class MongoAccountReadRepo implements IAccountReadRepo {
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Mongo.Collection;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  async getAll(): Promise<AccountReadModel[]> {
    const documents = await this.collection.find({}).toArray();
    const res: AccountReadModel[] = [];
    documents.forEach((document) => {
      res.push(
        AccountReadModel.fromPrimitives({
          id: document._id.toString(),
          balance: document.balance,
        }),
      );
    });
    return res;
  }

  async getById(accountId: string): Promise<AccountReadModel | null> {
    const document = await this.collection.findOne({
      _id: accountId,
    });
    if (!document) {
      return null;
    }
    return AccountReadModel.fromPrimitives({
      id: document._id.toString(),
      balance: document.balance,
    });
  }
}
