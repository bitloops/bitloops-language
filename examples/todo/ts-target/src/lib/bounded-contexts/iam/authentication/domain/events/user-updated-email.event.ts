import { asyncLocalStorage, Domain } from '@bitloops/bl-boilerplate-core';
import { UserEntity } from '../UserEntity';

export class UserUpdatedEmailDomainEvent
  implements Domain.IDomainEvent<UserEntity>
{
  public metadata: Domain.TDomainEventMetadata;
  public aggregateId: any;

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
