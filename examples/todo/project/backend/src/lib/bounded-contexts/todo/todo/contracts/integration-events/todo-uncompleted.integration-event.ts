import { Infra } from '@bitloops/bl-boilerplate-core';
import { TodoUncompletedDomainEvent } from '../../domain/events/todo-uncompleted.domain-event';
import { IntegrationTodoUncompletedSchemaV1 } from '../../structs/integration-todo-uncompleted-schema-v-1.struct';
type TIntegrationSchemas = IntegrationTodoUncompletedSchemaV1;
type ToIntegrationDataMapper = (
  event: TodoUncompletedDomainEvent
) => TIntegrationSchemas;
export class TodoUncompletedIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<TIntegrationSchemas> {
  public static readonly boundedContextId = 'todo';
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: TodoUncompletedIntegrationEvent.toIntegrationDatav1,
  };
  constructor(payload: TIntegrationSchemas, version: string) {
    super(TodoUncompletedIntegrationEvent.boundedContextId, payload, version);
  }
  static create(
    event: TodoUncompletedDomainEvent
  ): TodoUncompletedIntegrationEvent[] {
    return TodoUncompletedIntegrationEvent.versions.map((version) => {
      const mapper = TodoUncompletedIntegrationEvent.versionMappers[version];
      const payload = mapper(event);
      return new TodoUncompletedIntegrationEvent(payload, version);
    });
  }
  static toIntegrationDatav1(
    event: TodoUncompletedDomainEvent
  ): IntegrationTodoUncompletedSchemaV1 {
    const todoUncompleted = { todoId: event.aggregateId, userId: event.userId };
    return todoUncompleted;
  }
}
