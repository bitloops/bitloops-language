import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingCommandBusToken } from '../../../constants';
import { UserRegisteredIntegrationEvent } from '@bitloops/bl-boilerplate-infra-nest-auth-passport';
import { CreateUserCommand } from '../../../commands/create-user.command';
export class UserRegisteredIntegrationEventHandler
  implements Application.IHandleIntegrationEvent
{
  constructor(
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.IStreamCommandBus
  ) {}
  get event() {
    return UserRegisteredIntegrationEvent;
  }
  get boundedContext(): string {
    return UserRegisteredIntegrationEvent.boundedContextId;
  }
  get version() {
    return 'v1';
  }
  @Traceable({
    operation: 'UserRegisteredIntegrationEventHandler',
    metrics: {
      name: 'UserRegisteredIntegrationEventHandler',
      category: 'integrationEventHandler',
    },
  })
  public async handle(
    event: UserRegisteredIntegrationEvent
  ): Promise<Either<void, never>> {
    const command = new CreateUserCommand({
      userId: event.userId,
      email: event.email,
    });
    await this.commandBus.publish(command);
    return ok();
  }
}
