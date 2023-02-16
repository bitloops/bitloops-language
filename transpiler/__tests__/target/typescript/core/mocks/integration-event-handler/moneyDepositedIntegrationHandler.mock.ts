import { Application, Infra, Container } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedIntegrationEvent } from '../../../contracts/integration-events/MoneyDepositedIntegrationEvent';
export class MoneyDepositedIntegrationHandler implements Application.IHandle {
  private commandBus: Infra.CommandBus.ICommandBus;
  constructor() {
    this.commandBus = Container.getCommandBusFromContext('Banking');
  }
  public async handle(event: MoneyDepositedIntegrationEvent): Promise<void> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}
