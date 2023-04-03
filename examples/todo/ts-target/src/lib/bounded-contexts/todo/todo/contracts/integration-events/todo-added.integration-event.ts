import {
  asyncLocalStorage,
  Domain,
  Infra,
} from '@bitloops/bl-boilerplate-core';
import { TodoAddedDomainEvent } from '../../domain/events/todo-added.event';
import { TodoEntity } from '../../domain/TodoEntity';

export type IntegrationSchemaV1 = {
  todoId: string;
  title: string;
  userId: string;
};

type IntegrationSchemas = IntegrationSchemaV1;
type ToIntegrationDataMapper = (
  data: TodoAddedDomainEvent,
) => IntegrationSchemas;

export class TodoAddedIntegrationEvent
  implements Infra.EventBus.IntegrationEvent<IntegrationSchemas>
{
  static versions = ['v1'];
  public static readonly boundedContextId = 'Todo';
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: TodoAddedIntegrationEvent.toIntegrationDataV1,
  };
  public metadata: Infra.EventBus.TIntegrationEventMetadata;

  constructor(public data: IntegrationSchemas, version: string) {
    this.metadata = {
      boundedContextId: TodoAddedIntegrationEvent.boundedContextId,
      version,
      context: asyncLocalStorage.getStore()?.get('context'),
      messageId: new Domain.UUIDv4().toString(),
      correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
      createdTimestamp: Date.now(),
    };
  }

  static create(event: TodoAddedDomainEvent): TodoAddedIntegrationEvent[] {
    return TodoAddedIntegrationEvent.versions.map((version) => {
      const mapper = TodoAddedIntegrationEvent.versionMappers[version];
      const data = mapper(event);
      return new TodoAddedIntegrationEvent(data, version);
    });
  }

  static toIntegrationDataV1(event: TodoAddedDomainEvent): IntegrationSchemaV1 {
    // This is one way to handle (toPrimitives call from when publishing the domainEvent), we are the receiver
    const data: any = event.data;
    const todoEntity = TodoEntity.fromPrimitives(data);
    return {
      todoId: event.data.id.toString(),
      title: todoEntity.title.title, //event.data.title.title,
      userId: event.data.userId.toString(),
    };
  }

  static getEventTopic(version?: string) {
    const topic = `integration.${TodoAddedIntegrationEvent.name}`;

    const eventTopic = version === undefined ? topic : `${topic}.${version}`;
    return eventTopic;
  }
}
