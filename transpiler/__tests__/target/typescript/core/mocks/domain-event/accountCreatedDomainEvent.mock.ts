import { Domain } from '@bitloops/bl-boilerplate-core';
type AccountCreatedDomainEventProps = Domain.TDomainEventProps<{
  email: string;
  code: string;
}>;

export class AccountCreatedDomainEvent extends Domain.DomainEvent<AccountCreatedDomainEventProps> {
  public readonly aggregateId: string;

  constructor(payload: AccountCreatedDomainEventProps) {
    super('Banking', payload);
    this.aggregateId = payload.aggregateId;
  }
}
