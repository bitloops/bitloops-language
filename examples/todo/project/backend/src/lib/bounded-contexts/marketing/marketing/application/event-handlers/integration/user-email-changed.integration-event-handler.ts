import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingCommandBusToken } from '../../../constants';
import { UserChangedEmailIntegrationEvent } from '../../../../../iam/authentication/contracts/integration-events/user-changed-email.integration-event';
import { ChangeUserEmailCommand } from '../../../commands/change-user-email.command';
export class UserEmailChangedIntegrationEventHandler
  implements Application.IHandleIntegrationEvent
{
  constructor(
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.IStreamCommandBus
  ) {}
  get event() {
    return UserChangedEmailIntegrationEvent;
  }
  get boundedContext(): string {
    return UserChangedEmailIntegrationEvent.boundedContextId;
  }
  get version() {
    return 'v1';
  }
  @Traceable({
    operation: 'UserEmailChangedIntegrationEventHandler',
    metrics: {
      name: 'UserEmailChangedIntegrationEventHandler',
      category: 'integrationEventHandler',
    },
  })
  public async handle(
    event: UserChangedEmailIntegrationEvent
  ): Promise<Either<void, never>> {
    const command = new ChangeUserEmailCommand({
      userId: event.userId,
      email: event.userEmail,
    });
    await this.commandBus.publish(command);
    return ok();
  }
}
