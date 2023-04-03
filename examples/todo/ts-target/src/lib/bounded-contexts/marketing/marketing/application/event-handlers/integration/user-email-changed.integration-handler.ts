import { Infra, Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { UserEmailChangedIntegrationEvent } from '@src/lib/bounded-contexts/iam/authentication/contracts/integration-events/user-email-changed.integration-event';
import { ChangeUserEmailCommand } from '../../../commands/change-user-email.command';

export class UserEmailChangedIntegrationEventHandler
  implements Application.IHandleIntegrationEvent
{
  constructor(private commandBus: Infra.CommandBus.IStreamCommandBus) {}

  get event() {
    return UserEmailChangedIntegrationEvent;
  }

  get boundedContext() {
    return UserEmailChangedIntegrationEvent.boundedContextId;
  }

  get version() {
    return UserEmailChangedIntegrationEvent.versions[0]; // here output will be 'v1'
  }

  public async handle(
    event: UserEmailChangedIntegrationEvent,
  ): Promise<Either<void, never>> {
    const { data } = event;
    const command = new ChangeUserEmailCommand({
      userId: data.userId,
      email: data.email,
    });
    await this.commandBus.publish(command);

    console.log(
      `[UserEmailChangedIntegrationEvent]: Successfully sent UpdateUserEmail`,
    );
    return ok();
  }
}
