import { Application, Infra, Either } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { IEmailRepoPortToken, StreamingCommandBusToken } from '../../../constants';
import { IEmailRepoPort } from '../../../ports/i-email.repo-port';
import { MoneyDepositedToAccountDomainEvent } from '../../../domain/events/money-deposited-to-account.domain-event';
export class SendEmailAfterMoneyDepositedHandler implements Application.IHandleDomainEvent {
  constructor(
    @Inject(IEmailRepoPortToken)
    private readonly emailRepo: IEmailRepoPort,
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.IStreamCommandBus,
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
    const email = 'example@email.com';
    await this.commandBus.publish(email);
  }
}
