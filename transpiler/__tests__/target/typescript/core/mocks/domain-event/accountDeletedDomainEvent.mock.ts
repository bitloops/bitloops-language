import { Domain, asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
type AccountDeletedDomainEventProps = {
  aggregateId: string;
};
export class AccountDeletedDomainEvent
  implements Domain.IDomainEvent<AccountDeletedDomainEventProps>
{
  public readonly aggregateId: string;
  public readonly metadata: Domain.TDomainEventMetadata = {
    boundedContextId: 'Banking',
    createdTimestamp: Date.now(),
    messageId: new Domain.UUIDv4().toString(),
    correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
    context: asyncLocalStorage.getStore()?.get('context'),
  };
  constructor(public readonly data: AccountDeletedDomainEventProps) {
    this.aggregateId = data.aggregateId;
  }
}
