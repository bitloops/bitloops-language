import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import {
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingIntegrationEventBusToken,
} from '../../../constants';
import { TodoTitleModifiedDomainEvent } from '../../../domain/events/todo-title-modified.domain-event';
import { TodoModifiedTitleIntegrationEvent } from '../../../contracts/integration-events/todo-modified-title.integration-event';
export class TodoModifiedTitlePublishPubSubIntegrationDomainEventHandler
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
    return TodoTitleModifiedDomainEvent;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'TodoModifiedTitlePublishPubSubIntegrationDomainEventHandler',
    metrics: {
      name: 'TodoModifiedTitlePublishPubSubIntegrationDomainEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoTitleModifiedDomainEvent
  ): Promise<Either<void, never>> {
    const events = TodoModifiedTitleIntegrationEvent.create(event);
    await this.pubSubIntegrationEventBus.publish(events);
    return ok();
  }
}
