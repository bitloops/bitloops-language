import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingIntegrationEventBusToken } from '../../../constants';
import { TodoCompletedDomainEvent } from '../../../domain/events/todo-completed.domain-event';
import { TodoCompletedIntegrationEvent } from '../../../contracts/integration-events/todo-completed.integration-event';
export class TodoCompletedDomainEventToIntegrationEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(StreamingIntegrationEventBusToken)
    private readonly integrationEventBus: Infra.EventBus.IEventBus
  ) {}
  get event() {
    return TodoCompletedDomainEvent;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'TodoCompletedDomainEventToIntegrationEventHandler',
    metrics: {
      name: 'TodoCompletedDomainEventToIntegrationEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoCompletedDomainEvent
  ): Promise<Either<void, never>> {
    const events = TodoCompletedIntegrationEvent.create(event);
    await this.integrationEventBus.publish(events);
    return ok();
  }
}
