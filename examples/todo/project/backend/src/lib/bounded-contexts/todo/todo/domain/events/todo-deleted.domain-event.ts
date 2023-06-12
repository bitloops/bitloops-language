import { Domain } from '@bitloops/bl-boilerplate-core';
type TodoDeletedDomainEventProps = Domain.TDomainEventProps<{
  userId: string;
  title: string;
  completed: boolean;
}>;

export class TodoDeletedDomainEvent extends Domain.DomainEvent<TodoDeletedDomainEventProps> {
  public readonly aggregateId: string;

  constructor(payload: TodoDeletedDomainEventProps) {
    super('todo', payload);
    this.aggregateId = payload.aggregateId;
  }
}
