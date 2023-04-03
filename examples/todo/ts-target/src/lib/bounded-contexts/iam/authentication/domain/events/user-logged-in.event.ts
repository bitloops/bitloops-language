import { asyncLocalStorage, Domain } from '@bitloops/bl-boilerplate-core';
import { UserEntity } from '../UserEntity';

export class UserLoggedInDomainEvent
  implements Domain.IDomainEvent<UserEntity>
{
  public metadata: Domain.TDomainEventMetadata;
  public aggregateId: string;

  constructor(public readonly data: UserEntity) {
    this.metadata = {
      boundedContextId: 'IAM',
      messageId: new Domain.UUIDv4().toString(),
      createdTimestamp: Date.now(),
      correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
      context: asyncLocalStorage.getStore()?.get('context'),
    };
    this.aggregateId = data.id.toString();
  }
}
