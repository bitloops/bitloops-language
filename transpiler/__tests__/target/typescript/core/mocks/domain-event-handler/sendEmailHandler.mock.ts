import { Application, Infra, Either } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingCommandBusToken } from '../../../constants';
import { MoneyDepositedToAccountDomainEvent } from '../../../domain/events/money-deposited-to-account.domain-event';
import { DomainErrors } from '../../../domain/errors/index';
export class SendEmailAfterMoneyDepositedHandler implements Application.IHandleDomainEvent {
  constructor(
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
  public async handle(
    event: MoneyDepositedToAccountDomainEvent,
  ): Promise<Either<void, DomainErrors.SendEmailError>> {
    const email = 'example@email.com';
    await this.commandBus.publish(email);
  }
}
