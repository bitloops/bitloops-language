import { Application, Infra, Either } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { IEmailRepoPortToken, StreamingCommandBusToken } from '../../../constants';
import { IEmailRepoPort } from '../../../ports/IEmailRepoPort';
import { UserRegisteredIntegrationEvent } from '@bitloops/bl-boilerplate-infra-nest-auth-passport';
import { ApplicationErrors } from '../../errors/index';
export class MoneyDepositedIntegrationHandler implements Application.IHandleIntegrationEvent {
  constructor(
    @Inject(IEmailRepoPortToken)
    private readonly emailRepo: IEmailRepoPort,
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.IStreamCommandBus,
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
    operation: 'MoneyDepositedIntegrationHandler',
    metrics: {
      name: 'MoneyDepositedIntegrationHandler',
      category: 'integrationEventHandler',
    },
  })
  public async handle(
    event: UserRegisteredIntegrationEvent,
  ): Promise<Either<void, ApplicationErrors.InvalidMoneyError>> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}
