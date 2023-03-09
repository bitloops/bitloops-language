import { Either, ok } from '@bitloops/bl-boilerplate-core';
import { INotificationTemplateReadRepo } from '../../repos/interfaces/INotificationTemplateReadRepo.js';
import { AccountEntity } from '../AccountEntity.js

';
import { NotificationTemplateReadModel } from '../read-models/NotificationTemplateReadModel.js';

export class MarketingNotificationService {
  constructor(private notificationTemplateRepo: INotificationTemplateReadRepo) {}

  public async getNotificationTemplateToBeSent(
    account: AccountEntity,
  ): Promise<
    Either<
      { emailOrigin: string; notificationTemplate: NotificationTemplateReadModel | null },
      void
    >
  > {
    const emailOrigin = 'marketing@bitloops.com';
    let notificationTemplate: NotificationTemplateReadModel | null;
    if (account.isFirstDeposit()) {
      notificationTemplate = await this.notificationTemplateRepo.getByType('firstDeposit');
    } else if (account.hasReachedMilestoneDeposits()) {
      notificationTemplate = await this.notificationTemplateRepo.getByType('milestoneDeposit');
    } else {
      throw new Error('No notification template found');
    }

    return ok({ emailOrigin: emailOrigin, notificationTemplate });
  }
}
