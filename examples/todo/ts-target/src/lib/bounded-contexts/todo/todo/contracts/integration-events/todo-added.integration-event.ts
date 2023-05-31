import { Infra } from '@bitloops/bl-boilerplate-core';
import { TodoAddedDomainEvent } from '../../domain/events/todo-added.domain-event';
import { IntegrationTodoAddedSchemaV1 } from '../../structs/integration-todo-added-schema-v-1.struct';
type TIntegrationSchemas = IntegrationTodoAddedSchemaV1;
type ToIntegrationDataMapper = (
  event: TodoAddedDomainEvent
) => TIntegrationSchemas;
export class TodoAddedIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<TIntegrationSchemas> {
  public static readonly boundedContextId = 'todo';
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: TodoAddedIntegrationEvent.toIntegrationDatav1,
  };
  constructor(payload: TIntegrationSchemas, version: string) {
    super(TodoAddedIntegrationEvent.boundedContextId, payload, version);
  }
  static create(event: TodoAddedDomainEvent): TodoAddedIntegrationEvent[] {
    return TodoAddedIntegrationEvent.versions.map((version) => {
      const mapper = TodoAddedIntegrationEvent.versionMappers[version];
      const payload = mapper(event);
      return new TodoAddedIntegrationEvent(payload, version);
    });
  }
  static toIntegrationDatav1(
    event: TodoAddedDomainEvent
  ): IntegrationTodoAddedSchemaV1 {
    const todoAdded = {
      todoId: event.aggregateId,
      title: event.title,
      userId: event.userId,
    };
    return todoAdded;
  }
}
