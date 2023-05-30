
      import {
        Application,
        Domain,
        Either,
        Infra,
        asyncLocalStorage,
        ok,
      } from '@bitloops/bl-boilerplate-core';
      import { Injectable, Inject } from '@nestjs/common';
      import { Collection, MongoClient } from 'mongodb';
      import { DriverAvailabilityEntity } from '@lib/bounded-contexts/driver/driver-availability/domain/driver-availability.entity';
      import { DriverAvailabilityWriteRepoPort } from '@lib/bounded-contexts/driver/driver-availability/ports/driver-availability-write.repo-port';
      import { StreamingDomainEventBusToken } from '@lib/bounded-contexts/driver/driver-availability/constants';
      
      const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'driver';
      const MONGO_DB_DRIVER_AVAILABILITY_COLLECTION =
        process.env.MONGO_DB_DRIVER_AVAILABILITY_COLLECTION || 'driver_availabilities';
      
      @Injectable()
      export class MongoDriverAvailabilityWriteRepository implements DriverAvailabilityWriteRepoPort {
        private collectionName = MONGO_DB_DRIVER_AVAILABILITY_COLLECTION;
        private dbName = MONGO_DB_DATABASE;
        private collection: Collection;
      
        constructor(
          @Inject('MONGO_DB_CONNECTION') private client: MongoClient,
          @Inject(StreamingDomainEventBusToken)
          private readonly domainEventBus: Infra.EventBus.IEventBus,
        ) {
          this.collection = this.client
            .db(this.dbName)
            .collection(this.collectionName);
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async getById(
          id: Domain.UUIDv4,
        ): Promise<Either<DriverAvailabilityEntity | null, Application.Repo.Errors.Unexpected>> {
          const result = await this.collection.findOne({
            _id: id.toString() as any,
          });
      
          if (!result) {
            return ok(null);
          }
      
          const { _id, ...driverAvailability } = result as any;
          return ok(
            DriverAvailabilityEntity.fromPrimitives({
              ...driverAvailability,
              id: _id.toString(),
            }),
          );
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async update(
          driverAvailability: DriverAvailabilityEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const { id, ...driverAvailabilityInfo } = driverAvailability.toPrimitives();
          await this.collection.updateOne(
            {
              _id: id as any,
            },
            {
              $set: driverAvailabilityInfo,
            },
          );
      
          this.domainEventBus.publish(driverAvailability.domainEvents);
          return ok();
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async delete(
          driverAvailability: DriverAvailabilityEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const { id } = driverAvailability.toPrimitives();
          await this.collection.deleteOne({
            _id: id as any,
          });
      
          this.domainEventBus.publish(driverAvailability.domainEvents);
          return ok();
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async save(
          driverAvailability: DriverAvailabilityEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const createdDriverAvailability = driverAvailability.toPrimitives();
      
          await this.collection.insertOne({
            _id: createdDriverAvailability.id as any,
            ...createdDriverAvailability,
          });
      
          this.domainEventBus.publish(driverAvailability.domainEvents);
          return ok();
        }
      }
      