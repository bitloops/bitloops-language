import { Domain, asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
import { AccountEntity } from '../AccountEntity';
export class AccountCreatedDomainEvent implements Domain.IDomainEvent<AccountEntity> {
  public aggregateId: string;
  public readonly metadata: Domain.TDomainEventMetadata = {
    boundedContextId: 'Banking',
    createdTimestamp: Date.now(),
    messageId: new Domain.UUIDv4().toString(),
    correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
    context: asyncLocalStorage.getStore()?.get('context'),
  };
  constructor(public readonly data: AccountEntity) {
    this.aggregateId = data.id.toString();
  }
}
