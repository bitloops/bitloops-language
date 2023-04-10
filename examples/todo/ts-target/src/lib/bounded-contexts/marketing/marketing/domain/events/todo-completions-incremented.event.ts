import { Domain, asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
import { UserEntity } from '../user.entity';

export class TodoCompletionsIncrementedDomainEvent
  implements Domain.IDomainEvent<UserEntity>
{
  public metadata: Domain.TDomainEventMetadata;
  public aggregateId: string;

  constructor(public readonly data: UserEntity) {
    const uuid = new Domain.UUIDv4();
    this.metadata = {
      boundedContextId: 'Marketing',
      createdTimestamp: Date.now(),
      context: asyncLocalStorage.getStore()?.get('context'),
      messageId: uuid.toString(),
      correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
    };
    this.aggregateId = data.id.toString();
  }
}
