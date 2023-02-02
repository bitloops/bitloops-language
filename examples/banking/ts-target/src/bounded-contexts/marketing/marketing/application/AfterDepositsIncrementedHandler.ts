import { Infra, Application } from '@bitloops/bl-boilerplate-core';
import {
  GetCustomerByAccountIdQuery,
  GetCustomerByAccountIdUseCaseResponse,
} from '../../../banking/banking/contracts';
import { DepositsIncrementedDomainEvent } from '../domain/events/DepositsIncrementedDomainEvent';
import { SendEmailCommand } from './send-email';

export class AfterDepositsIncrementedHandler implements Application.IHandle {
  constructor(
    private commandBus: Infra.CommandBus.ICommandBus,
    private queryBus: Infra.QueryBus.IQueryBus,
  ) {}

  public async handle(event: DepositsIncrementedDomainEvent): Promise<void> {
    const { data } = event;
    const depositsCounter = data.deposits.counter;

    let emailContent = '';
    if (data.isFirstDeposit()) {
      emailContent = 'Congrats, you have made your first deposit!';
    } else if (data.hasReachedMilestoneDeposits()) {
      emailContent = `Congrats, you have made ${depositsCounter} deposits!`;
    } else {
      return;
    }

    const getCustomerQuery = new GetCustomerByAccountIdQuery(data.id.toString());
    const customerQueryResult = await this.queryBus.query<GetCustomerByAccountIdUseCaseResponse>(
      getCustomerQuery,
    );
    if (customerQueryResult.isFail()) {
      return;
    }
    const command = new SendEmailCommand({
      origin: 'ant@ant.com',
      destination: customerQueryResult.value.email,
      content: emailContent,
    });

    await this.commandBus.send(command);
    console.log(`[AfterMoneyDepositsIncrementedDomainEvent]: Successfully sent SendEmail Command`);
  }
}
