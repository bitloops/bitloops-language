import { Infra, Application, Container } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedToAccount } from '../../../domain/events/MoneyDepositedToAccount';

export class SendEmailAfterMoneyDepositedHandler implements Application.IHandle {
  private commandBus: Infra.CommandBus.ICommandBus;
  constructor() {
    this.commandBus = Container.getCommandBusFromContext('banking');
  }

  public async handle(event: MoneyDepositedToAccount): Promise<void> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}
