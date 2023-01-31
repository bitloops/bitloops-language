import { Domain } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { CustomerEntity } from '../CustomerEntity.js';

const TODO_CREATED_EVENT_NAME = 'TODO_CREATED_EVENT_NAME';
const FROM_CONTEXT_ID = contextId;

export class CustomerCreated extends Domain.Event {
  public static readonly eventName = TODO_CREATED_EVENT_NAME;
  public static readonly fromContextId = FROM_CONTEXT_ID;

  constructor(public readonly customer: CustomerEntity, uuid?: string) {
    const metadata = {
      fromContextId: CustomerCreated.fromContextId,
      id: uuid,
    };

    super(CustomerCreated.getEventTopic(), customer, metadata, customer.id);
    this.customer = customer;
  }

  static getEventTopic() {
    return CustomerCreated.eventName;
  }
}
