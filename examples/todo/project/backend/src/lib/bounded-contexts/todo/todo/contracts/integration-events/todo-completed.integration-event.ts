import { Infra } from '@bitloops/bl-boilerplate-core';
import { TodoCompletedDomainEvent } from '../../domain/events/todo-completed.domain-event';
import { IntegrationTodoCompletedSchemaV1 } from '../../structs/integration-todo-completed-schema-v-1.struct';
type TIntegrationSchemas = IntegrationTodoCompletedSchemaV1;
type ToIntegrationDataMapper = (
  event: TodoCompletedDomainEvent
) => TIntegrationSchemas;
export class TodoCompletedIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<TIntegrationSchemas> {
  public static readonly boundedContextId = 'todo';
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: TodoCompletedIntegrationEvent.toIntegrationDatav1,
  };
  constructor(payload: TIntegrationSchemas, version: string) {
    super(TodoCompletedIntegrationEvent.boundedContextId, payload, version);
  }
  static create(
    event: TodoCompletedDomainEvent
  ): TodoCompletedIntegrationEvent[] {
    return TodoCompletedIntegrationEvent.versions.map((version) => {
      const mapper = TodoCompletedIntegrationEvent.versionMappers[version];
      const payload = mapper(event);
      return new TodoCompletedIntegrationEvent(payload, version);
    });
  }
  static toIntegrationDatav1(
    event: TodoCompletedDomainEvent
  ): IntegrationTodoCompletedSchemaV1 {
    const todoCompleted = { todoId: event.aggregateId, userId: event.userId };
    return todoCompleted;
  }
}
