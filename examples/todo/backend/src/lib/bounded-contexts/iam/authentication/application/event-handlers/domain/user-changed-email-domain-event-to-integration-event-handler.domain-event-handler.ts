import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingIntegrationEventBusToken } from '../../../constants';
import { UserChangedEmailDomainEvent } from '../../../domain/events/user-changed-email.domain-event';
import { UserChangedEmailIntegrationEvent } from '../../../contracts/integration-events/user-changed-email.integration-event';
export class UserChangedEmailDomainEventToIntegrationEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(StreamingIntegrationEventBusToken)
    private readonly integrationEventBus: Infra.EventBus.IEventBus
  ) {}
  get event() {
    return UserChangedEmailDomainEvent;
  }
  get boundedContext(): string {
    return 'iam';
  }
  @Traceable({
    operation: 'UserChangedEmailDomainEventToIntegrationEventHandler',
    metrics: {
      name: 'UserChangedEmailDomainEventToIntegrationEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: UserChangedEmailDomainEvent
  ): Promise<Either<void, never>> {
    const events = UserChangedEmailIntegrationEvent.create(event);
    await this.integrationEventBus.publish(events);
    return ok();
  }
}
