import { Application, Infra, Container } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedIntegrationEvent } from '../../../contracts/integration-events/MoneyDepositedIntegrationEvent';
import { IEmailRepoPort } from '../../../ports/IEmailRepoPort';
export class MoneyDepositedIntegrationHandler implements Application.IHandle {
  private commandBus: Infra.CommandBus.ICommandBus;
  constructor(private emailRepo: IEmailRepoPort) {
    this.commandBus = Container.getCommandBusFromContext('marketing');
  }
  public async handle(event: MoneyDepositedIntegrationEvent): Promise<void> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}
