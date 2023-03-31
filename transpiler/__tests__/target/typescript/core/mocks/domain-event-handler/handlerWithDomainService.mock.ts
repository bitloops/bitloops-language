import { Application, Infra, Container } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { MoneyDepositedToAccountDomainEvent } from '../../../domain/events/MoneyDepositedToAccountDomainEvent';
import { MarketingNotificationDomainService } from '../../../structs/MarketingNotificationDomainService';
export class SendEmailAfterMoneyDepositedHandler implements Application.IHandle {
  private commandBus: Infra.CommandBus.ICommandBus;
  constructor() {
    this.commandBus = Container.getCommandBus();
  }
  get event() {
    return MoneyDepositedToAccountDomainEvent;
  }
  get boundedContext(): string {
    return MoneyDepositedToAccountDomainEvent.boundedContext;
  }
  @Traceable({
    operation: 'SendEmailAfterMoneyDepositedHandler',
    metrics: {
      name: 'SendEmailAfterMoneyDepositedHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(event: MoneyDepositedToAccountDomainEvent): Promise<void> {
    const marketingNotificationService = new MarketingNotificationDomainService(this.repo);
    const emailToBeSentInfoResponse =
      await marketingNotificationService.getNotificationTemplateToBeSent(user);
    await this.commandBus.send(emailToBeSentInfoResponse);
  }
}
