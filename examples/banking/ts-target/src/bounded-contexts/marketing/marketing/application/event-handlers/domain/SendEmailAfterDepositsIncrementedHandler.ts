import { Infra, Application } from '@bitloops/bl-boilerplate-core';
import { DepositsIncrementedDomainEvent } from '../../../domain/events/DepositsIncrementedDomainEvent';
import { SendEmailCommand } from '../../send-email';
import { ICustomerService } from '../../../services/interfaces/ICustomerService';
import { MarketingNotificationService } from '../../../domain/services/MarketingNotificationService';
import { INotificationTemplateReadRepo } from '../../../repos/interfaces/INotificationTemplateReadRepo';
import { AccountEntity } from '../../../domain/AccountEntity.js';

export class SendEmailAfterDepositsIncrementedHandler implements Application.IHandle {
  constructor(
    private commandBus: Infra.CommandBus.ICommandBus,
    private customerService: ICustomerService, // private marketingRepo: Marketing
    private notificationTemplateRepo: INotificationTemplateReadRepo,
  ) {}

  public async handle(event: DepositsIncrementedDomainEvent): Promise<void> {
    const { data: account } = event;

    const marketingNotificationService = new MarketingNotificationService(
      this.notificationTemplateRepo,
    );

    if (!this.shouldSendEmailPolicy(account)) return;

    const emailToBeSentInfoResponse =
      await marketingNotificationService.getNotificationTemplateToBeSent(account);
    if (emailToBeSentInfoResponse.isFail()) {
      return emailToBeSentInfoResponse.value;
    }
    const emailToBeSentInfo = emailToBeSentInfoResponse.value;

    const destinationEmailOrError = await this.customerService.getEmailByAccountId(
      account.id.toString(),
    );
    if (destinationEmailOrError.isFail()) {
      return;
    }
    const destinationEmail = destinationEmailOrError.value.email;

    //TDOO fix text of template
    const command = new SendEmailCommand({
      origin: emailToBeSentInfo.emailOrigin,
      destination: destinationEmail,
      content: emailToBeSentInfo.notificationTemplate?.template || '',
    });

    await this.commandBus.send(command);
    console.log(`[AfterMoneyDepositsIncrementedDomainEvent]: Successfully sent SendEmail Command`);
  }

  private shouldSendEmailPolicy(account: AccountEntity): boolean {
    return account.isFirstDeposit() || account.hasReachedMilestoneDeposits();
  }
}
