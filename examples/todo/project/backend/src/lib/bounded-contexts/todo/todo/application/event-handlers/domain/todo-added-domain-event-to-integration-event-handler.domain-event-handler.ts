import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingIntegrationEventBusToken } from '../../../constants';
import { TodoAddedDomainEvent } from '../../../domain/events/todo-added.domain-event';
import { TodoAddedIntegrationEvent } from '../../../contracts/integration-events/todo-added.integration-event';
export class TodoAddedDomainEventToIntegrationEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(StreamingIntegrationEventBusToken)
    private readonly integrationEventBus: Infra.EventBus.IEventBus
  ) {}
  get event() {
    return TodoAddedDomainEvent;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'TodoAddedDomainEventToIntegrationEventHandler',
    metrics: {
      name: 'TodoAddedDomainEventToIntegrationEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoAddedDomainEvent
  ): Promise<Either<void, never>> {
    const events = TodoAddedIntegrationEvent.create(event);
    await this.integrationEventBus.publish(events);
    return ok();
  }
}
