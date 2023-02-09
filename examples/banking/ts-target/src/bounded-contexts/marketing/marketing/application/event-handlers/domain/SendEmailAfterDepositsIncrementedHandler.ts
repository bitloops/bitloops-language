import { Infra, Application } from '@bitloops/bl-boilerplate-core';
import {
  GetCustomerByAccountIdQuery,
  GetCustomerByAccountIdUseCaseResponse,
} from '../../../../../banking/banking/contracts';
import { DepositsIncrementedDomainEvent } from '../../../domain/events/DepositsIncrementedDomainEvent';
import { SendEmailCommand } from '../../send-email';
import { ICustomerService } from '../../../services/interfaces/ICustomerService';

export class SendEmailAfterDepositsIncrementedHandler implements Application.IHandle {
  constructor(
    private commandBus: Infra.CommandBus.ICommandBus,
    private queryBus: Infra.QueryBus.IQueryBus,
    private customerService: ICustomerService,
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

    const destinationEmail = await this.customerService.getEmailByAccountId(data.id.toString());

    const command = new SendEmailCommand({
      origin: 'ant@ant.com',
      destination: destinationEmail,
      content: emailContent,
    });

    await this.commandBus.send(command);
    console.log(`[AfterMoneyDepositsIncrementedDomainEvent]: Successfully sent SendEmail Command`);
  }
}
