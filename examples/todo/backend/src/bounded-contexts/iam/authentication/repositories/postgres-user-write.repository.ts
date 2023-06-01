
      import {
        Application,
        Domain,
        Either,
        Infra,
        asyncLocalStorage,
        ok,
      } from '@bitloops/bl-boilerplate-core';
      import { Injectable, Inject } from '@nestjs/common';
      import { Pool } from 'pg';
      import { UserEntity } from '@lib/bounded-contexts/iam/authentication/domain/user.entity';
      import { UserWriteRepoPort } from '@lib/bounded-contexts/iam/authentication/ports/user-write.repo-port';
      import { StreamingDomainEventBusToken } from '@lib/bounded-contexts/iam/authentication/constants';
      
      @Injectable()
      export class PostgresUserWriteRepository implements UserWriteRepoPort {
        constructor(
          @Inject('POSTGRES_DB_CONNECTION') private client: Pool,
          @Inject(StreamingDomainEventBusToken)
          private readonly domainEventBus: Infra.EventBus.IEventBus,
        ) {}
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async getById(
          id: Domain.UUIDv4,
        ): Promise<Either<UserEntity | null, Application.Repo.Errors.Unexpected>> {
          const result = await this.client.query(
            'SELECT * FROM users WHERE id = $1',
            [id.toString()],
          );
      
          if (result.rowCount === 0) {
            return ok(null);
          }
      
          const user = result.rows[0];
          return ok(
            UserEntity.fromPrimitives({
              ...user,
              id: user.id,
            }),
          );
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async save(
          user: UserEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const createdUser = user.toPrimitives();
          await this.client.query(
            'INSERT INTO users (id, email, password) VALUES ($1, $2, $3)',
            [createdUser.id, createdUser.email, createdUser.password],
          );
      
          this.domainEventBus.publish(user.domainEvents);
          return ok();
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async update(
          user: UserEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const userPrimitives = user.toPrimitives();
          await this.client.query(
            'UPDATE users SET email = $1, password = $2 WHERE id = $3',
            [userPrimitives.email, userPrimitives.password, userPrimitives.id],
          );
      
          this.domainEventBus.publish(user.domainEvents);
          return ok();
        }
      
        @Application.Repo.Decorators.ReturnUnexpectedError()
        async delete(
          user: UserEntity,
        ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
          const userPrimitives = user.toPrimitives();
          await this.client.query('DELETE FROM users WHERE id = $1', [
            userPrimitives.id,
          ]);
      
          this.domainEventBus.publish(user.domainEvents);
          return ok();
        }
      }
      