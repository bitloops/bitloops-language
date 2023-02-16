import { Container, Infra, Application } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedIntegrationEvent } from '../../../../../banking/banking/contracts';
import { CONTEXT_ID } from '../../../config/index.js';
import { IncrementDepositsCommand } from '../../increase-deposit-counter';

export class MoneyDepositedIntegrationHandler implements Application.IHandle {
  private commandBus: Infra.CommandBus.ICommandBus;
  constructor() {
    this.commandBus = Container.getCommandBusFromContext(CONTEXT_ID);
  }

  public async handle(event: MoneyDepositedIntegrationEvent): Promise<void> {
    const { data } = event;

    const command = new IncrementDepositsCommand({ accountId: data.accountId });

    await this.commandBus.send(command);
    console.log(`[AfterMoneyDepositedIntegrationEvent]: Successfully sent Increment Command`);
  }
}
