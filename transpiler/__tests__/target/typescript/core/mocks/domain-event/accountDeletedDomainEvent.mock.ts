import { Domain } from '@bitloops/bl-boilerplate-core';
type AccountDeletedDomainEventProps = Domain.TDomainEventProps<{}>;

export class AccountDeletedDomainEvent extends Domain.DomainEvent<AccountDeletedDomainEventProps> {
  public readonly aggregateId: string;

  constructor(payload: AccountDeletedDomainEventProps) {
    super('Banking', payload);
    this.aggregateId = payload.aggregateId;
  }
}
