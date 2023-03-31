import { Application, Infra } from '@bitloops/bl-boilerplate-core';
import { Inject } from '@nestjs/common';
import { IEmailRepoPortToken, StreamingCommandBusToken } from '../../../constants';
import { IEmailRepoPort } from '../../../ports/IEmailRepoPort';
import { MoneyDepositedToAccountDomainEvent } from '../../../domain/events/MoneyDepositedToAccountDomainEvent';
export class SendEmailAfterMoneyDepositedHandler implements Application.IHandle {
  constructor(
    @Inject(IEmailRepoPortToken)
    private readonly emailRepo: IEmailRepoPort,
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.ICommandBus,
  ) {}
  public async handle(event: MoneyDepositedToAccountDomainEvent): Promise<void> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}
