import { Domain } from '@bitloops/bl-boilerplate-core';
import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { ICustomerWriteRepo } from '../interfaces/ICustomerWriteRepo';
import { CustomerEntity } from '../../domain/CustomerEntity';
import { MongoCustomerWriteRepoMapper } from '../mappers/MongoCustomerWriteRepoMapper';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'banking';
const MONGO_DB_TODO_COLLECTION = process.env.MONGO_DB_TODO_COLLECTION || 'customers';

export class MongoCustomerWriteRepo implements ICustomerWriteRepo {
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Mongo.Collection;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  async getById(customerId: Domain.UUIDv4): Promise<CustomerEntity | null> {
    const res = await this.collection.findOne({
      _id: customerId.toString(),
    });
    if (res === null) return res;
    return MongoCustomerWriteRepoMapper.toDomain(res);
  }

  async delete(customer: Domain.UUIDv4): Promise<void> {
    await this.collection.deleteOne({
      _id: customer.toString(),
    });
  }

  async save(customer: CustomerEntity): Promise<void> {
    await this.collection.insertOne(MongoCustomerWriteRepoMapper.toPersistence(customer));
    // add command metadata if they exist
    await Domain.dispatchEventsCallback(customer.id /*, metadata*/);
  }

  async update(customer: CustomerEntity): Promise<void> {
    await this.collection.updateOne(
      {
        _id: customer.id.toString(),
      },
      {
        $set: MongoCustomerWriteRepoMapper.toPersistence(customer),
      },
    );
    await Domain.dispatchEventsCallback(customer.id /*, metadata*/);
  }

  async getByEmail(email: string): Promise<CustomerEntity | null> {
    const res = await this.collection.findOne({
      email,
    });
    if (res === null) return res;
    return MongoCustomerWriteRepoMapper.toDomain(res);
  }
}
