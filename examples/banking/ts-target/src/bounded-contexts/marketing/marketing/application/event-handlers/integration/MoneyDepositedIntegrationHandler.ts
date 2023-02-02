import { Infra } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedIntegrationEvent } from '../../../../../banking/banking/contracts';
import { IncrementDepositsCommand } from '../../increase-deposit-counter';

export class MoneyDepositedIntegrationHandler {
  constructor(private commandBus: Infra.CommandBus.ICommandBus) {}

  public async handle(event: MoneyDepositedIntegrationEvent): Promise<void> {
    const { data } = event;

    const command = new IncrementDepositsCommand({ accountId: data.accountId });

    await this.commandBus.send(command);
    console.log(`[AfterMoneyDepositedIntegrationEvent]: Successfully sent Increment Command`);
  }
}
