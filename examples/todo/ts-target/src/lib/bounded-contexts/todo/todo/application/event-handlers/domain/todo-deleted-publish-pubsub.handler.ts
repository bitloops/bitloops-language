import { Infra, Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { Inject } from '@nestjs/common';
import { TodoDeletedDomainEvent } from '../../../domain/events/todo-deleted.event';
import { PubSubIntegrationEventBusToken } from '../../../constants';
import { TodoDeletedIntegrationEvent } from '../../../contracts/integration-events/todo-deleted.integration-event';

export class TodoDeletedDomainToPubSubIntegrationEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(PubSubIntegrationEventBusToken)
    private eventBus: Infra.EventBus.IEventBus,
  ) {}
  get event() {
    return TodoDeletedDomainEvent;
  }

  get boundedContext(): string {
    return 'Todo';
  }

  public async handle(
    event: TodoDeletedDomainEvent,
  ): Promise<Either<void, never>> {
    const events = TodoDeletedIntegrationEvent.create(event);

    await this.eventBus.publish(events);

    console.log(
      `[TodoDeletedDomainEventHandler]: Successfully published TodoDeletedPubSubIntegrationEvent`,
    );
    return ok();
  }
}
