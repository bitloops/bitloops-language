
import { Application, Domain, Either, Infra, asyncLocalStorage, ok } from '@bitloops/bl-boilerplate-core';
import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { UserEntity } from '@lib/bounded-contexts/iam/authentication/domain/user.entity';
import { UserWriteRepoPort } from '@lib/bounded-contexts/iam/authentication/ports/user-write.repo-port';
import { ConfigService } from '@nestjs/config';
import { AuthEnvironmentVariables } from '@src/config/auth.configuration';
import { StreamingDomainEventBusToken } from '@lib/bounded-contexts/iam/authentication/constants';

@Injectable()
export class PostgresUserWriteRepository implements UserWriteRepoPort {
  private JWT_SECRET: string;

  constructor(
    @Inject('POSTGRES_CONNECTION') private client: Pool,
    @Inject(StreamingDomainEventBusToken)
    private readonly domainEventBus: Infra.EventBus.IEventBus,
    private configService: ConfigService<AuthEnvironmentVariables, true>
  ) {
    this.JWT_SECRET = this.configService.get('jwtSecret', { infer: true });
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async getById(id: Domain.UUIDv4): Promise<Either<UserEntity | null, Application.Repo.Errors.Unexpected>> {
    const result = await this.client.query('SELECT * FROM users WHERE id = $1', [id.toString()]);

    if (!result.rows.length) {
      return ok(null);
    }

    const user = result.rows[0];
    return ok(
      UserEntity.fromPrimitives({
        ...user,
        id: user.id,
      })
    );
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async update(user: UserEntity): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
    const { id, ...userInfo } = user.toPrimitives();
    const values = Object.values(userInfo);
    const setQuery = Object.keys(userInfo).map((key, i) => `${key} = $${i + 1}`).join(', ');

    await this.client.query(`UPDATE users SET ${setQuery} WHERE id = $${values.length + 1}`, [...values, id]);
    this.domainEventBus.publish(user.domainEvents);
    return ok();
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async delete(user: UserEntity): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
    const { id } = user.toPrimitives();
    await this.client.query('DELETE FROM users WHERE id = $1', [id]);
    this.domainEventBus.publish(user.domainEvents);
    return ok();
  }

  @Application.Repo.Decorators.ReturnUnexpectedError()
  async save(user: UserEntity): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
    const { id, ...userInfo } = user.toPrimitives();
    const values = [id, ...Object.values(userInfo)];
    const columns = ['id', ...Object.keys(userInfo)].join(', ');
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    await this.client.query(`INSERT INTO users (${columns}) VALUES (${placeholders})`, values);
    this.domainEventBus.publish(user.domainEvents);
    return ok();
  }
}
