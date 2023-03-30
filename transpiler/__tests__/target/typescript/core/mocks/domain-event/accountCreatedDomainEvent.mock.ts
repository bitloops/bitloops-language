import { Domain } from '@bitloops/bl-boilerplate-core';
import { AccountEntity } from '../AccountEntity';
export class AccountCreatedDomainEvent extends Domain.Event<AccountEntity> {
  constructor(public readonly account: AccountEntity, uuid?: string) {
    super();
  }
  static getEventTopic() {
    return AccountCreatedDomainEvent.eventName;
  }
}
