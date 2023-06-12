import { Domain } from '@bitloops/bl-boilerplate-core';
type TodoCompletionsIncrementedDomainEventProps = Domain.TDomainEventProps<{
  completedTodos: number;
}>;

export class TodoCompletionsIncrementedDomainEvent extends Domain.DomainEvent<TodoCompletionsIncrementedDomainEventProps> {
  public readonly aggregateId: string;

  constructor(payload: TodoCompletionsIncrementedDomainEventProps) {
    super('marketing', payload);
    this.aggregateId = payload.aggregateId;
  }
}
