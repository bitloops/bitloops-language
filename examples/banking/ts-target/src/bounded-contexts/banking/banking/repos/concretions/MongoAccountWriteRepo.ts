import { Domain } from '@bitloops/bl-boilerplate-core';
import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { AccountEntity } from '../../domain/AccountEntity.js';
import { IAccountWriteRepo } from '../interfaces/IAccountWriteRepo.js';
import { MongoAccountWriteRepoMapper } from '../mappers/MongoAccountWriteRepoMapper copy.js';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'banking';
const MONGO_DB_TODO_COLLECTION = process.env.MONGO_DB_TODO_COLLECTION || 'accounts';

export class MongoAccountWriteRepo implements IAccountWriteRepo {
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Mongo.Collection;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  async getById(accountId: Domain.UUIDv4): Promise<AccountEntity | null> {
    const res = await this.collection.findOne({
      _id: accountId.toString(),
    });
    if (res === null) return res;
    return MongoAccountWriteRepoMapper.toDomain(res);
  }

  async delete(account: Domain.UUIDv4): Promise<void> {
    await this.collection.deleteOne({
      _id: account.toString(),
    });
  }

  async save(account: AccountEntity): Promise<void> {
    await this.collection.insertOne(MongoAccountWriteRepoMapper.toPersistence(account));
    // add command metadata if they exist
    await Domain.dispatchEventsCallback(account.id /*, metadata*/);
  }

  async update(account: AccountEntity): Promise<void> {
    await this.collection.updateOne(
      {
        _id: account.id.toString(),
      },
      {
        $set: {
          balance: account.balance.props,
        },
      },
    );
  }
}
