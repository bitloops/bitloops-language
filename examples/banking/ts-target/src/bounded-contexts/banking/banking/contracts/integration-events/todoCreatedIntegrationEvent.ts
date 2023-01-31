// TODO use protobufs

import { Infra } from '@bitloops/bl-boilerplate-core';
import { CustomerCreated } from '../../domain/events/TodoCreated';

type TodoIntegrationSchemaV1 = {
  title: string;
};

type TodoIntegrationSchemaV2 = {
  title: string;
  completed: boolean;
};

type TodoCreatedIntegrationEventPayload = TodoIntegrationSchemaV1 | TodoIntegrationSchemaV2;

type CreateInput = {
  title: string;
  completed: boolean;
}; // v1 | v2 ...

type ToIntegrationDataMapper = (data: CreateInput) => TodoCreatedIntegrationEventPayload;

export class TodoCreatedIntegrationEvent extends Infra.EventBus.IntegrationEvent {
  static versionMappers: Record<string, ToIntegrationDataMapper> = {
    v1: TodoCreatedIntegrationEvent.toIntegrationDataV1,
    v2: TodoCreatedIntegrationEvent.toIntegrationDataV2,
  };
  //Todo static create
  constructor(data: TodoCreatedIntegrationEventPayload, version: string, uuid?: string) {
    const metadata = {
      id: uuid,
      fromContextId: CustomerCreated.fromContextId,
      version,
    };
    super(TodoCreatedIntegrationEvent.getEventTopic(version), data, metadata);
  }
  static versions = ['v1', 'v2'];

  static create(params: CreateInput): TodoCreatedIntegrationEvent[] {
    return TodoCreatedIntegrationEvent.versions.map((version) => {
      const mapper = TodoCreatedIntegrationEvent.versionMappers[version];
      const data = mapper(params);
      return new TodoCreatedIntegrationEvent(data, version);
    });
  }

  static toIntegrationDataV1(data: CreateInput): TodoIntegrationSchemaV1 {
    return {
      title: data.title,
    };
  }

  static toIntegrationDataV2(data: CreateInput): TodoIntegrationSchemaV2 {
    return {
      title: data.title,
      completed: data.completed,
    };
  }

  static getEventTopic(version?: string) {
    const topic = `integration.${TodoCreatedIntegrationEvent.name}`;

    const eventTopic = version === undefined ? topic : `${topic}.${version}`;
    return eventTopic;
  }
}
