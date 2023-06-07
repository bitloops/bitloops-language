import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import {
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingIntegrationEventBusToken,
} from '../../../constants';
import { TodoUncompletedDomainEvent } from '../../../domain/events/todo-uncompleted.domain-event';
import { TodoUncompletedIntegrationEvent } from '../../../contracts/integration-events/todo-uncompleted.integration-event';
export class TodoUncompletedPublishPubSubIntegrationDomainEventHandler
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
    return TodoUncompletedDomainEvent;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'TodoUncompletedPublishPubSubIntegrationDomainEventHandler',
    metrics: {
      name: 'TodoUncompletedPublishPubSubIntegrationDomainEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoUncompletedDomainEvent
  ): Promise<Either<void, never>> {
    const events = TodoUncompletedIntegrationEvent.create(event);
    await this.pubSubIntegrationEventBus.publish(events);
    return ok();
  }
}
