import { Domain } from '@bitloops/bl-boilerplate-core';
type UserChangedEmailDomainEventProps = Domain.TDomainEventProps<{
  email: string;
  password: string;
  lastLogin: string;
}>;

export class UserChangedEmailDomainEvent extends Domain.DomainEvent<UserChangedEmailDomainEventProps> {
  public readonly aggregateId: string;

  constructor(payload: UserChangedEmailDomainEventProps) {
    super('iam', payload);
    this.aggregateId = payload.aggregateId;
  }
}
