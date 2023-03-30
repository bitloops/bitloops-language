import { Application, Infra, Container } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedToAccountDomainEvent } from '../../../domain/events/MoneyDepositedToAccountDomainEvent';
export class SendEmailAfterMoneyDepositedHandler implements Application.IHandle {
  private commandBus: Infra.CommandBus.ICommandBus;
  constructor() {
    this.commandBus = Container.getCommandBus();
  }
  get event() {
    return MoneyDepositedToAccountDomainEvent;
  }
  get boundedContext(): string {
    return 'Banking';
  }
  public async handle(event: MoneyDepositedToAccountDomainEvent): Promise<void> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}
