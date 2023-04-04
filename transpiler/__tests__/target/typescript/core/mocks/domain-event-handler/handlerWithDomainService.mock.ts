import { Application, Infra, Either } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingCommandBusToken } from '../../../constants';
import { MoneyDepositedToAccountDomainEvent } from '../../../domain/events/MoneyDepositedToAccountDomainEvent';
import { MarketingNotificationDomainService } from '../../../structs/MarketingNotificationDomainService';
export class SendEmailAfterMoneyDepositedHandler implements Application.IHandleDomainEvent {
  constructor(
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.ICommandBus,
  ) {}
  get event() {
    return MoneyDepositedToAccountDomainEvent;
  }
  get boundedContext(): string {
    return 'Banking';
  }
  @Traceable({
    operation: 'SendEmailAfterMoneyDepositedHandler',
    metrics: {
      name: 'SendEmailAfterMoneyDepositedHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(event: MoneyDepositedToAccountDomainEvent): Promise<Either<void, never>> {
    const marketingNotificationService = new MarketingNotificationDomainService(this.repo);
    const emailToBeSentInfoResponse =
      await marketingNotificationService.getNotificationTemplateToBeSent(user);
    await this.commandBus.send(emailToBeSentInfoResponse);
  }
}
