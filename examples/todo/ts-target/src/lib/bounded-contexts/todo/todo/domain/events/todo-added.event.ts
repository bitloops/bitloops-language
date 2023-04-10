import { Domain } from '@bitloops/bl-boilerplate-core';
import { asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
import { TodoEntity } from '../TodoEntity';

export class TodoAddedDomainEvent implements Domain.IDomainEvent<TodoEntity> {
  public aggregateId: string;
  public readonly metadata: Domain.TDomainEventMetadata = {
    boundedContextId: 'Todo',
    createdTimestamp: Date.now(),
    messageId: new Domain.UUIDv4().toString(),
    correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
    context: asyncLocalStorage.getStore()?.get('context'),
  };

  constructor(public readonly data: TodoEntity) {
    this.aggregateId = data.id.toString();
  }
}
