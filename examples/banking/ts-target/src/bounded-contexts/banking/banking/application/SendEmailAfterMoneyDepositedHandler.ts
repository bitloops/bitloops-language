import { Infra, Application } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedToAccount } from '../domain/events/MoneyDepositedToAccount';
import { SendEmailVerificationCommand } from './send-email-verification';
import { GetCustomerByAccountIdQuery } from './get-customer-details-by-account-id/GetCustomerByAccountIdQuery';
import { GetCustomerByAccountIdResponse } from './get-customer-details-by-account-id/GetCustomerByAccountIdQueryHandler.js';

export class SendEmailAfterMoneyDepositedHandler implements Application.IHandle {
  constructor(
    private commandBus: Infra.CommandBus.ICommandBus,
    private queryBus: Infra.QueryBus.IQueryBus,
  ) {}

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