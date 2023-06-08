import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import {
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingIntegrationEventBusToken,
} from '../../../constants';
import { TodoDeletedDomainEvent } from '../../../domain/events/todo-deleted.domain-event';
import { TodoDeletedIntegrationEvent } from '../../../contracts/integration-events/todo-deleted.integration-event';
export class TodoDeletedPublishPubSubIntegrationDomainEventHandler
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
    return TodoDeletedDomainEvent;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'TodoDeletedPublishPubSubIntegrationDomainEventHandler',
    metrics: {
      name: 'TodoDeletedPublishPubSubIntegrationDomainEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoDeletedDomainEvent
  ): Promise<Either<void, never>> {
    const events = TodoDeletedIntegrationEvent.create(event);
    await this.pubSubIntegrationEventBus.publish(events);
    return ok();
  }
}
