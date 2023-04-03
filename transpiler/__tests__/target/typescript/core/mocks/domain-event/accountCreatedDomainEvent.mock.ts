import { Domain, asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
type AccountCreatedDomainEventProps = {
  email: string;
  code: string;
} & {
  aggregateId: string;
};

export class AccountCreatedDomainEvent
  implements Domain.IDomainEvent<AccountCreatedDomainEventProps>
{
  public readonly aggregateId: string;
  public readonly metadata: Domain.TDomainEventMetadata = {
    boundedContextId: 'Banking',
    createdTimestamp: Date.now(),
    messageId: new Domain.UUIDv4().toString(),
    correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
    context: asyncLocalStorage.getStore()?.get('context'),
  };
  constructor(public readonly data: AccountCreatedDomainEventProps) {
    this.aggregateId = data.aggregateId;
  }
}
