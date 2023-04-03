import { Infra, Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { Inject } from '@nestjs/common';
import { TodoUncompletedDomainEvent } from '../../../domain/events/todo-uncompleted.event';
import { PubSubIntegrationEventBusToken } from '../../../constants';
import { TodoUncompletedIntegrationEvent } from '../../../contracts/integration-events/todo-uncompleted.integration-event';

export class TodoUncompletedDomainToPubSubIntegrationEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(PubSubIntegrationEventBusToken)
    private eventBus: Infra.EventBus.IEventBus,
  ) {}
  get event() {
    return TodoUncompletedDomainEvent;
  }

  get boundedContext(): string {
    return 'Todo';
  }

  public async handle(
    event: TodoUncompletedDomainEvent,
  ): Promise<Either<void, never>> {
    const events = TodoUncompletedIntegrationEvent.create(event);

    await this.eventBus.publish(events);

    console.log(
      `[TodoUncompletedDomainEventHandler]: Successfully published TodoUncompletedPubSubIntegrationEvent`,
    );
    return ok();
  }
}
