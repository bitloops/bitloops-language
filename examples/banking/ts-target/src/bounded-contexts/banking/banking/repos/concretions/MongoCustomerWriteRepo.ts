import { Domain } from '@bitloops/bl-boilerplate-core';
import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { ICustomerWriteRepo } from '../interfaces/ICustomerWriteRepo.js';
import { CustomerEntity } from '../../domain/CustomerEntity.js';
import { MongoCustomerWriteRepoMapper } from '../mappers/MongoCustomerWriteRepoMapper.js';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'banking';
const MONGO_DB_TODO_COLLECTION = process.env.MONGO_DB_TODO_COLLECTION || 'customers';

export class MongoCustomerWriteRepo implements ICustomerWriteRepo {
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Mongo.Collection;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  async getById(customerId: Domain.UUIDv4): Promise<CustomerEntity> {
    const res = await this.collection.findOne({
      _id: customerId.toString(),
    });
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
        $set: {
          email: customer.email.email,
          pin: customer.pin.pin,
          accountId: customer.accountId.toString(),
        },
      },
    );
  }

  async getByEmail(email: string): Promise<CustomerEntity> {
    const res = await this.collection.findOne({
      email,
    });
    return MongoCustomerWriteRepoMapper.toDomain(res);
  }
}
