import { Infra } from '@bitloops/bl-boilerplate-core';
import { TodoTitleModifiedDomainEvent } from '../../domain/events/todo-title-modified.domain-event';
import { IntegrationTodoModifiedTitleSchemaV1 } from '../../structs/integration-todo-modified-title-schema-v-1.struct';
type TIntegrationSchemas = IntegrationTodoModifiedTitleSchemaV1;
type ToIntegrationDataMapper = (
  event: TodoTitleModifiedDomainEvent
) => TIntegrationSchemas;
export class TodoModifiedTitleIntegrationEvent extends Infra.EventBus
  .IntegrationEvent<TIntegrationSchemas> {
  public static readonly boundedContextId = 'todo';
  static versions = ['v1'];
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: TodoModifiedTitleIntegrationEvent.toIntegrationDatav1,
  };
  constructor(payload: TIntegrationSchemas, version: string) {
    super(TodoModifiedTitleIntegrationEvent.boundedContextId, payload, version);
  }
  static create(
    event: TodoTitleModifiedDomainEvent
  ): TodoModifiedTitleIntegrationEvent[] {
    return TodoModifiedTitleIntegrationEvent.versions.map((version) => {
      const mapper = TodoModifiedTitleIntegrationEvent.versionMappers[version];
      const payload = mapper(event);
      return new TodoModifiedTitleIntegrationEvent(payload, version);
    });
  }
  static toIntegrationDatav1(
    event: TodoTitleModifiedDomainEvent
  ): IntegrationTodoModifiedTitleSchemaV1 {
    const todoTitleModified = {
      todoId: event.aggregateId,
      title: event.title,
      userId: event.userId,
    };
    return todoTitleModified;
  }
}
