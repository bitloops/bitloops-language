import { Infra, Application, Container } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedToAccount } from '../../../domain/events/MoneyDepositedToAccount';
import { SendEmailVerificationCommand } from '../../send-email-verification';
import { GetCustomerByAccountIdQuery } from '../../get-customer-details-by-account-id/GetCustomerByAccountIdQuery';
import { GetCustomerByAccountIdResponse } from '../../get-customer-details-by-account-id/GetCustomerByAccountIdQueryHandler';
import { CONTEXT_ID } from '../../../config/index.js';

export class SendEmailAfterMoneyDepositedHandler implements Application.IHandle {
  private commandBus: Infra.CommandBus.ICommandBus;
  private queryBus: Infra.QueryBus.IQueryBus;
  constructor() {
    // private queryBus: Infra.QueryBus.IQueryBus, // private commandBus: Infra.CommandBus.ICommandBus,
    this.commandBus = Container.getCommandBusFromContext(CONTEXT_ID);
    this.queryBus = Container.getQueryBusFromContext(CONTEXT_ID);
  }

  public async handle(event: MoneyDepositedToAccount): Promise<void> {
    const { account } = event;

    const { id: accountId } = account;

    const getCustomerQuery = new GetCustomerByAccountIdQuery({ accountId: accountId.toString() });

    const customerQueryResult = await this.queryBus.query<GetCustomerByAccountIdResponse>(
      getCustomerQuery,
    );
    if (customerQueryResult.isFail()) {
      return;
    }
    const email = customerQueryResult.value.email;

    const command = new SendEmailVerificationCommand({ accountId: accountId.toString(), email });

    await this.commandBus.send(command);

    console.log(
      `[AfterMoneyDepositedDomainEvent]: Successfully published SendEmailVerificationCommand`,
    );
  }
}
