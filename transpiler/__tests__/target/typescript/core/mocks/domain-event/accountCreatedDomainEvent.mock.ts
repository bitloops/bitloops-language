import { Domain } from '@bitloops/bl-boilerplate-core';
import { AccountEntity } from '../AccountEntity';
export class AccountCreatedDomainEvent extends Domain.Event<AccountEntity> {
  public static readonly eventName = 'Banking.Banking.DOMAIN_EVENT.ACCOUNT_CREATED';
  public static readonly fromContextId = 'Banking';
  constructor(public readonly account: AccountEntity, uuid?: string) {
    const metadata = {
      fromContextId: AccountCreatedDomainEvent.fromContextId,
      id: uuid,
    };
    super(AccountCreatedDomainEvent.getEventTopic(), account, metadata, account.id);
  }
  static getEventTopic() {
    return AccountCreatedDomainEvent.eventName;
  }
}
