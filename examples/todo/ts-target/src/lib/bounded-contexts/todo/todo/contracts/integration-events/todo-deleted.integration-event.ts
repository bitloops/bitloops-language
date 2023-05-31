import { Infra } from '@bitloops/bl-boilerplate-core';
import { TodoDeletedDomainEvent } from '../../domain/events/todo-deleted.domain-event';
import { IntegrationTodoDeletedSchemaV1 } from '../../structs/integration-todo-deleted-schema-v-1.struct';
type TIntegrationSchemas = IntegrationTodoDeletedSchemaV1;
type ToIntegrationDataMapper = (
  event: TodoDeletedDomainEvent
) => TIntegrationSchemas;
export class TodoDeletedIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<TIntegrationSchemas> {
  public static readonly boundedContextId = 'todo';
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: TodoDeletedIntegrationEvent.toIntegrationDatav1,
  };
  constructor(payload: TIntegrationSchemas, version: string) {
    super(TodoDeletedIntegrationEvent.boundedContextId, payload, version);
  }
  static create(event: TodoDeletedDomainEvent): TodoDeletedIntegrationEvent[] {
    return TodoDeletedIntegrationEvent.versions.map((version) => {
      const mapper = TodoDeletedIntegrationEvent.versionMappers[version];
      const payload = mapper(event);
      return new TodoDeletedIntegrationEvent(payload, version);
    });
  }
  static toIntegrationDatav1(
    event: TodoDeletedDomainEvent
  ): IntegrationTodoDeletedSchemaV1 {
    const todoDeleted = { todoId: event.aggregateId, userId: event.userId };
    return todoDeleted;
  }
}
