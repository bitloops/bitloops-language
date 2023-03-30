import { Application, Infra, Container } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedIntegrationEvent } from '../../../../../banking/banking/contracts/integration-events/MoneyDepositedIntegrationEvent';
export class MoneyDepositedIntegrationHandler implements Application.IHandle {
  private commandBus: Infra.CommandBus.ICommandBus;
  constructor() {
    this.commandBus = Container.getCommandBus();
  }
  get event() {
    return MoneyDepositedIntegrationEvent;
  }
  get boundedContext(): string {
    return 'Banking';
  }
  public async handle(event: MoneyDepositedIntegrationEvent): Promise<void> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}
