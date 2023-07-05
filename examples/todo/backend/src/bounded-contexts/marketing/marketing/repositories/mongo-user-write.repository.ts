
import { Application, Domain, Either, Infra, asyncLocalStorage, ok } from '@bitloops/bl-boilerplate-core';
import { Injectable, Inject } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import { UserEntity } from '@lib/bounded-contexts/marketing/marketing/domain/user.entity';
import { UserWriteRepoPort } from '@lib/bounded-contexts/marketing/marketing/ports/user-write.repo-port';
import { StreamingDomainEventBusToken } from '@lib/bounded-contexts/marketing/marketing/constants';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'marketing';
const MONGO_DB_USER_COLLECTION = process.env.MONGO_DB_USER_COLLECTION || 'users';

@Injectable()
export class MongoUserWriteRepository implements UserWriteRepoPort {
  private collectionName = MONGO_DB_USER_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Collection;

  constructor(
    @Inject('MONGO_DB_CONNECTION') private client: MongoClient,
    @Inject(StreamingDomainEventBusToken)
    private readonly domainEventBus: Infra.EventBus.IEventBus
  ) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async getById(id: Domain.UUIDv4): Promise<Either<UserEntity | null, Application.Repo.Errors.Unexpected>> {
    const result = await this.collection.findOne({
      _id: id.toString() as any,
    });

    if (!result) {
      return ok(null);
    }

    const { _id, ...user } = result as any;
    return ok(
      UserEntity.fromPrimitives({
        ...user,
        id: _id.toString(),
      })
    );
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async update(user: UserEntity): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
    const { id, ...userInfo } = user.toPrimitives();
    await this.collection.updateOne(
      {
        _id: id as any,
      },
      {
        $set: userInfo,
      }
    );
    this.domainEventBus.publish(user.domainEvents);
    return ok();
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async delete(user: UserEntity): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
    const { id } = user.toPrimitives();
    await this.collection.deleteOne({
      _id: id as any,
    });
    this.domainEventBus.publish(user.domainEvents);
    return ok();
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async save(user: UserEntity): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
    const { id, ...userInfo } = user.toPrimitives();
    await this.collection.insertOne({
      _id: id as any,
      ...userInfo,
    });
    this.domainEventBus.publish(user.domainEvents);
    return ok();
  }
}
