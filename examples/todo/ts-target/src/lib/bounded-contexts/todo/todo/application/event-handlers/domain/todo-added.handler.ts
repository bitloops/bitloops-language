import { Infra, Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { Inject } from '@nestjs/common';
import { TodoAddedDomainEvent } from '../../../domain/events/todo-added.event';
import { StreamingIntegrationEventBusToken } from '../../../constants';
import { TodoAddedIntegrationEvent } from '../../../contracts/integration-events/todo-added.integration-event';

export class TodoAddedDomainToIntegrationEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(StreamingIntegrationEventBusToken)
    private eventBus: Infra.EventBus.IEventBus,
  ) {}
  get event() {
    return TodoAddedDomainEvent;
  }

  get boundedContext(): string {
    return 'Todo';
  }

  public async handle(
    event: TodoAddedDomainEvent,
  ): Promise<Either<void, never>> {
    const events = TodoAddedIntegrationEvent.create(event);

    // await this.eventBus.publish(events);

    console.log(
      `[TodoAddedDomainEventHandler]: Successfully published TodoAddedIntegrationEvent`,
    );
    return ok();
  }
}
