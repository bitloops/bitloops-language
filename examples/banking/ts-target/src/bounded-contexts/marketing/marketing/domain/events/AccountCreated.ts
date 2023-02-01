import { Domain } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { AccountEntity } from '../AccountEntity';

const ACCOUNT_CREATED_EVENT_NAME = 'ACCOUNT_CREATED_EVENT_NAME';
const FROM_CONTEXT_ID = contextId;

export class AccountCreated extends Domain.Event {
  public static readonly eventName = ACCOUNT_CREATED_EVENT_NAME;
  public static readonly fromContextId = FROM_CONTEXT_ID;

  constructor(public readonly account: AccountEntity, uuid?: string) {
    const metadata = {
      fromContextId: AccountCreated.fromContextId,
      id: uuid,
    };
    super(AccountCreated.getEventTopic(), account, metadata, account.id);
  }

  static getEventTopic() {
    return AccountCreated.eventName;
  }
}
