import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import {
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingIntegrationEventBusToken,
} from '../../../constants';
import { TodoCompletedDomainEvent } from '../../../domain/events/todo-completed.domain-event';
import { TodoCompletedIntegrationEvent } from '../../../contracts/integration-events/todo-completed.integration-event';
export class TodoCompletedPublishPubSubIntegrationDomainEventHandler
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
    return TodoCompletedDomainEvent;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'TodoCompletedPublishPubSubIntegrationDomainEventHandler',
    metrics: {
      name: 'TodoCompletedPublishPubSubIntegrationDomainEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoCompletedDomainEvent
  ): Promise<Either<void, never>> {
    const events = TodoCompletedIntegrationEvent.create(event);
    await this.pubSubIntegrationEventBus.publish(events);
    return ok();
  }
}
