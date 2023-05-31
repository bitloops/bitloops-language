import { Domain } from '@bitloops/bl-boilerplate-core';
type TodoTitleModifiedDomainEventProps = Domain.TDomainEventProps<{
  userId: string;
  title: string;
  completed: boolean;
}>;

export class TodoTitleModifiedDomainEvent extends Domain.DomainEvent<TodoTitleModifiedDomainEventProps> {
  public readonly aggregateId: string;

  constructor(payload: TodoTitleModifiedDomainEventProps) {
    super('todo', payload);
    this.aggregateId = payload.aggregateId;
  }
}
