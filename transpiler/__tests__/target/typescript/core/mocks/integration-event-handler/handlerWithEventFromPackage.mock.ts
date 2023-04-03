import { Application, Infra } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { IEmailRepoPortToken, StreamingCommandBusToken } from '../../../constants';
import { IEmailRepoPort } from '../../../ports/IEmailRepoPort';
import { UserRegisteredIntegrationEvent } from '@bitloops/bl-boilerplate-infra-nest-auth-passport';
export class MoneyDepositedIntegrationHandler implements Application.IHandle {
  constructor(
    @Inject(IEmailRepoPortToken)
    private readonly emailRepo: IEmailRepoPort,
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.ICommandBus,
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
  public async handle(event: UserRegisteredIntegrationEvent): Promise<void> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}