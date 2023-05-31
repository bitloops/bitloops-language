import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import {
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingIntegrationEventBusToken,
} from '../../../constants';
import { TodoAddedDomainEvent } from '../../../domain/events/todo-added.domain-event';
import { TodoAddedIntegrationEvent } from '../../../contracts/integration-events/todo-added.integration-event';
export class TodoAddedPublishPubSubIntegrationDomainEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.IStreamCommandBus,
    @Inject(StreamingIntegrationEventBusToken)
    private readonly integrationEventBus: Infra.EventBus.IEventBus,
    @Inject(PubSubIntegrationEventBusToken)
    private readonly pubSubIntegrationEventBus: Infra.EventBus.IEventBus
  ) {}
  get event() {
    return TodoAddedDomainEvent;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'TodoAddedPublishPubSubIntegrationDomainEventHandler',
    metrics: {
      name: 'TodoAddedPublishPubSubIntegrationDomainEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoAddedDomainEvent
  ): Promise<Either<void, never>> {
    const events = TodoAddedIntegrationEvent.create(event);
    await this.pubSubIntegrationEventBus.publish(events);
    return ok();
  }
}
