import { Either, ok } from '@bitloops/bl-boilerplate-core';
import { INotificationTemplateReadRepo } from '../../repos/interfaces/INotificationTemplateReadRepo.js';
import { AccountEntity } from '../AccountEntity';
import { NotificationResponse } from '../../structs/NotificationResponse';

export class MarketingNotificationService {
  constructor(private notificationTemplateRepo: INotificationTemplateReadRepo) {}

  public async getNotificationTemplateToBeSent(
    account: AccountEntity,
  ): Promise<Either<NotificationResponse, void>> {
    return ok(account);
  }
}
