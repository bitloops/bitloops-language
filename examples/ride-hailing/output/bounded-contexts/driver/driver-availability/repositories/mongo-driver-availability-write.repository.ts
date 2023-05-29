
      import {
        Application,
        Either,
        Infra,
        asyncLocalStorage,
        ok,
      } from '@bitloops/bl-boilerplate-core';
      import { Injectable, Inject } from '@nestjs/common';
      import { Collection, MongoClient } from 'mongodb';
      import * as jwtwebtoken from 'jsonwebtoken';
      import { DriverAvailabilityEntity } from '@lib/bounded-contexts/driver/driver-availability/domain/driver-availability.entity';
      import { DriverAvailabilityWriteRepoPort } from '@lib/bounded-contexts/driver/driver-availability/ports/driver-availability-write.repo-port';
      import { ConfigService } from '@nestjs/config';
      import { AuthEnvironmentVariables } from '@src/config/auth.configuration';
      import { StreamingDomainEventBusToken } from '@lib/bounded-contexts/driver/driver-availability/constants';
      
      const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'driver';
      const MONGO_DB_DRIVER_AVAILABILITY_COLLECTION =
        process.env.MONGO_DB_DRIVER_AVAILABILITY_COLLECTION || 'driver_availabilities';
      
      @Injectable()
      export class MongoDriverAvailabilityWriteRepository implements DriverAvailabilityWriteRepoPort {
        private collectionName = MONGO_DB_DRIVER_AVAILABILITY_COLLECTION;
        private dbName = MONGO_DB_DATABASE;
        private collection: Collection;
        private JWT_SECRET: string;
      
        constructor(
          @Inject('MONGO_DB_CONNECTION') private client: MongoClient,
          @Inject(StreamingDomainEventBusToken)
          private readonly domainEventBus: Infra.EventBus.IEventBus,
          private configService: ConfigService<AuthEnvironmentVariables, true>,
        ) {
          this.collection = this.client
            .db(this.dbName)
            .collection(this.collectionName);
          this.JWT_SECRET = this.configService.get('jwtSecret', { infer: true });
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async getById(
          id: string,
        ): Promise<Either<DriverAvailabilityEntity | null, Application.Repo.Errors.Unexpected>> {
          const ctx = asyncLocalStorage.getStore()?.get('context');
          const { jwt } = ctx;
          let jwtPayload: null | any = null;
          try {
            jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
          } catch (err) {
            throw new Error('Invalid JWT!');
          }
          const result = await this.collection.findOne({
            _id: id as any,
          });
      
          if (!result) {
            return ok(null);
          }
      
          if (result.userId.id !== jwtPayload.sub) {
            throw new Error('Invalid userId');
          }
      
          const { _id, ...availability } = result as any;
          return ok(
            DriverAvailabilityEntity.fromPrimitives({
              ...availability,
              id: _id.toString(),
            }),
          );
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async update(
          availability: DriverAvailabilityEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const ctx = asyncLocalStorage.getStore()?.get('context');
          const { jwt } = ctx;
          let jwtPayload: null | any = null;
          try {
            jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
          } catch (err) {
            throw new Error('Invalid JWT!');
          }
          const availabilityPrimitives = availability.toPrimitives();
          if (availabilityPrimitives.userId.id !== jwtPayload.sub) {
            throw new Error('Unauthorized userId');
          }
          const { id, ...availabilityInfo } = availabilityPrimitives;
          await this.collection.updateOne(
            {
              _id: id as any,
            },
            {
              $set: availabilityInfo,
            },
          );
      
          this.domainEventBus.publish(availability.domainEvents);
          return ok();
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async delete(
          availability: DriverAvailabilityEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const ctx = asyncLocalStorage.getStore()?.get('context');
          const { jwt } = ctx;
          let jwtPayload: null | any = null;
          try {
            jwtPayload = jwtwebtoken.verify(jwt, this.JWT_SECRET);
          } catch (err) {
            throw new Error('Invalid JWT!');
          }
          const availabilityPrimitives = availability.toPrimitives();
          if (availabilityPrimitives.userId.id !== jwtPayload.sub) {
            throw new Error('Unauthorized userId');
          }
          const { id } = availabilityPrimitives;
          await this.collection.deleteOne({
            _id: id as any,
          });
      
          this.domainEventBus.publish(availability.domainEvents);
          return ok();
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async save(
          availability: DriverAvailabilityEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const availabilityPrimitives = availability.toPrimitives();
      
          await this.collection.insertOne({
            _id: availabilityPrimitives.id as any,
            ...availabilityPrimitives,
          });
      
          this.domainEventBus.publish(availability.domainEvents);
          return ok();
        }
      }
      