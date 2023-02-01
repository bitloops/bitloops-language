import { Infra } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedIntegrationEvent } from '../../../banking/banking/contracts';
import { SendEmailCommand } from '../application/commands';

export class MoneyDepositedIntegrationHandler /*<ToDoCreatedIntegration>*/ {
  constructor(private commandBus: Infra.CommandBus.ICommandBus) {}

  // Possible Policy would go here
  public async handle(event: MoneyDepositedIntegrationEvent): Promise<void> {
    const { data } = event;

    const command = new SendEmailCommand({
      origin: 'ant@ant.gr',
      destination: 'elli@ant.gr',
      content: `Hello the title of todo is ${data.title}`,
    });

    await this.commandBus.send(command);
    console.log(`[AfterMoneyDepositedIntegrationEvent]: Successfully sent SendEmail Command`);
  }
}
