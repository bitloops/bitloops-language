import { Infra, Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { Inject } from '@nestjs/common';
import { TodoCompletedDomainEvent } from '../../../domain/events/todo-completed.event';
import { PubSubIntegrationEventBusToken } from '../../../constants';
import { TodoCompletedIntegrationEvent } from '../../../contracts/integration-events/todo-completed.integration-event';

export class TodoCompletedDomainToPubSubIntegrationEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(PubSubIntegrationEventBusToken)
    private eventBus: Infra.EventBus.IEventBus,
  ) {}
  get event() {
    return TodoCompletedDomainEvent;
  }

  get boundedContext(): string {
    return 'Todo';
  }

  public async handle(
    event: TodoCompletedDomainEvent,
  ): Promise<Either<void, never>> {
    const events = TodoCompletedIntegrationEvent.create(event);

    await this.eventBus.publish(events);

    console.log(
      `[TodoCompletedDomainEventHandler]: Successfully published TodoCompletedPubSubIntegrationEvent`,
    );
    return ok();
  }
}
