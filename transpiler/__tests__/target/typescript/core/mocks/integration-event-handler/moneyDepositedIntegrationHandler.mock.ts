import { Application, Infra } from '@bitloops/bl-boilerplate-core';
import { Inject } from '@nestjs/common';
import { StreamingCommandBusToken } from '../../../constants';
import { MoneyDepositedIntegrationEvent } from '../../../../../banking/banking/contracts/integration-events/MoneyDepositedIntegrationEvent';
export class MoneyDepositedIntegrationHandler implements Application.IHandle {
  constructor(
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.ICommandBus,
  ) {}
  public async handle(event: MoneyDepositedIntegrationEvent): Promise<void> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}
