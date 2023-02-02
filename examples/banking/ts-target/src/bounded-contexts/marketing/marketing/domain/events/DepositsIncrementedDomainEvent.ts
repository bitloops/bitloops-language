import { Domain } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { AccountEntity } from '../AccountEntity';

const DEPOSITS_INCREMENTED_EVENT_NAME = 'DEPOSITS_INCREMENTED_EVENT_NAME';
const FROM_CONTEXT_ID = contextId;

export class DepositsIncrementedDomainEvent extends Domain.Event<AccountEntity> {
  public static readonly eventName = DEPOSITS_INCREMENTED_EVENT_NAME;
  public static readonly fromContextId = FROM_CONTEXT_ID;

  constructor(public readonly account: AccountEntity, uuid?: string) {
    const metadata = {
      fromContextId: DepositsIncrementedDomainEvent.fromContextId,
      id: uuid,
    };
    super(DepositsIncrementedDomainEvent.getEventTopic(), account, metadata, account.id);
  }

  static getEventTopic() {
    return DepositsIncrementedDomainEvent.eventName;
  }
}
