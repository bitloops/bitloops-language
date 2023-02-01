import { Domain } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { AccountEntity } from '../AccountEntity';

const MONEY_WITHDRAWN_FROM_ACCOUNT_EVENT_NAME = 'MONEY_WITHDRAWN_FROM_ACCOUNT_EVENT_NAME';
const FROM_CONTEXT_ID = contextId;

export class MoneyWithdrawnFromAccount extends Domain.Event {
  public static readonly eventName = MONEY_WITHDRAWN_FROM_ACCOUNT_EVENT_NAME;
  public static readonly fromContextId = FROM_CONTEXT_ID;

  constructor(public readonly account: AccountEntity, uuid?: string) {
    const metadata = {
      fromContextId: MoneyWithdrawnFromAccount.fromContextId,
      id: uuid,
    };
    super(MoneyWithdrawnFromAccount.getEventTopic(), account, metadata, account.id);
  }

  static getEventTopic() {
    return MoneyWithdrawnFromAccount.eventName;
  }
}
