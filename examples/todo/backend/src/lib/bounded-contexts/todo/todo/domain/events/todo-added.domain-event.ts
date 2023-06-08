import { Domain } from '@bitloops/bl-boilerplate-core';
type TodoAddedDomainEventProps = Domain.TDomainEventProps<{
  userId: string;
  title: string;
  completed: boolean;
}>;

export class TodoAddedDomainEvent extends Domain.DomainEvent<TodoAddedDomainEventProps> {
  public readonly aggregateId: string;

  constructor(payload: TodoAddedDomainEventProps) {
    super('todo', payload);
    this.aggregateId = payload.aggregateId;
  }
}
