import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingIntegrationEventBusToken } from '../../../constants';
import { TodoUncompletedDomainEvent } from '../../../domain/events/todo-uncompleted.domain-event';
import { TodoUncompletedIntegrationEvent } from '../../../contracts/integration-events/todo-uncompleted.integration-event';
export class TodoUncompletedDomainEventToIntegrationEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(StreamingIntegrationEventBusToken)
    private readonly integrationEventBus: Infra.EventBus.IEventBus
  ) {}
  get event() {
    return TodoUncompletedDomainEvent;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'TodoUncompletedDomainEventToIntegrationEventHandler',
    metrics: {
      name: 'TodoUncompletedDomainEventToIntegrationEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoUncompletedDomainEvent
  ): Promise<Either<void, never>> {
    const events = TodoUncompletedIntegrationEvent.create(event);
    await this.integrationEventBus.publish(events);
    return ok();
  }
}
