import { Either, ok } from '@bitloops/bl-boilerplate-core';
import { INotificationTemplateReadRepo } from '../../repos/interfaces/INotificationTemplateReadRepo.js';
import { AccountEntity } from '../AccountEntity.js';
import { NotificationTemplateReadModel } from '../read-models/NotificationTemplateReadModel.js';

//TODO emailContent and emailOrigin should be in a repository
export class MarketingNotificationService {
  static emailOrigin = 'marketing@bitloops.com';

  constructor(private notificationTemplateRepo: INotificationTemplateReadRepo) {}

  public async getNotificationTemplateToBeSent(
    account: AccountEntity,
  ): Promise<
    Either<
      { emailOrigin: string; notificationTemplate: NotificationTemplateReadModel | null } | null,
      void
    >
  > {
    const depositsCounter = account.deposits.counter;
    let notificationTemplate: NotificationTemplateReadModel | null;
    if (account.isFirstDeposit()) {
      notificationTemplate = await this.notificationTemplateRepo.getByType('firstDeposit');
    } else if (account.hasReachedMilestoneDeposits()) {
      notificationTemplate = await this.notificationTemplateRepo.getByTypeAndDeposits(
        'milestoneDeposit',
        [depositsCounter.toString()],
      );
    } else {
      return ok(null);
    }

    return ok({ emailOrigin: MarketingNotificationService.emailOrigin, notificationTemplate });
  }
}
