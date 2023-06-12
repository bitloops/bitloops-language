import { Domain } from '@bitloops/bl-boilerplate-core';
type TodoUncompletedDomainEventProps = Domain.TDomainEventProps<{
  userId: string;
  title: string;
  completed: boolean;
}>;

export class TodoUncompletedDomainEvent extends Domain.DomainEvent<TodoUncompletedDomainEventProps> {
  public readonly aggregateId: string;

  constructor(payload: TodoUncompletedDomainEventProps) {
    super('todo', payload);
    this.aggregateId = payload.aggregateId;
  }
}
