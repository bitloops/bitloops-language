import { Either, Infra } from '@bitloops/bl-boilerplate-core';
import { ApplicationErrors } from '../../../banking/banking/application/errors';
import { GetCustomerByAccountIdQuery } from '../../../banking/banking/application/get-customer-details-by-account-id/GetCustomerByAccountIdQuery';
import { MoneyDepositedIntegrationEvent } from '../../../banking/banking/contracts';
import { CustomerReadModel } from '../../../banking/banking/domain/CustomerReadModel';
import { SendEmailCommand } from '../application/commands';

type GetCustomerBydIdUseCaseResponse = Either<
  CustomerReadModel,
  ApplicationErrors.CustomerNotFound
>;

export class MoneyDepositedIntegrationHandler /*<ToDoCreatedIntegration>*/ {
  constructor(
    private commandBus: Infra.CommandBus.ICommandBus,
    private queryBus: Infra.QueryBus.IQueryBus,
  ) {}

  // Possible Policy would go here
  public async handle(event: MoneyDepositedIntegrationEvent): Promise<void> {
    const { data } = event;

    const getCustomerQuery = new GetCustomerByAccountIdQuery(data.accountId);

    const customerQueryResult = await this.queryBus.query<GetCustomerBydIdUseCaseResponse>(
      getCustomerQuery,
    );
    if (customerQueryResult.isFail()) {
      return;
    } else {
      const command = new SendEmailCommand({
        origin: 'ant@ant.gr',
        destination: customerQueryResult.value.email,
        content: `Hello the title of todo is ${data.title}`,
      });

      await this.commandBus.send(command);
      console.log(`[AfterMoneyDepositedIntegrationEvent]: Successfully sent SendEmail Command`);
    }
  }
}
