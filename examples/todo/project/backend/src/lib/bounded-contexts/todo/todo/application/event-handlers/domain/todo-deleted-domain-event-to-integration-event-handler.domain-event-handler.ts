import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingIntegrationEventBusToken } from '../../../constants';
import { TodoDeletedDomainEvent } from '../../../domain/events/todo-deleted.domain-event';
import { TodoDeletedIntegrationEvent } from '../../../contracts/integration-events/todo-deleted.integration-event';
export class TodoDeletedDomainEventToIntegrationEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(StreamingIntegrationEventBusToken)
    private readonly integrationEventBus: Infra.EventBus.IEventBus
  ) {}
  get event() {
    return TodoDeletedDomainEvent;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'TodoDeletedDomainEventToIntegrationEventHandler',
    metrics: {
      name: 'TodoDeletedDomainEventToIntegrationEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoDeletedDomainEvent
  ): Promise<Either<void, never>> {
    const events = TodoDeletedIntegrationEvent.create(event);
    await this.integrationEventBus.publish(events);
    return ok();
  }
}
