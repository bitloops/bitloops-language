import { Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountEntity } from '../AccountEntity';
import { NotificationResponse } from '../../structs/NotificationResponse';
import { NotificationTemplateReadRepoPort } from '../../ports/NotificationTemplateReadRepoPort';
export class MarketingNotificationService {
  constructor(private notificationTemplateRepoPort: NotificationTemplateReadRepoPort) {}
  public async getNotificationTemplateToBeSent(
    account: AccountEntity,
  ): Promise<Either<NotificationResponse, never>> {
    return ok(account);
  }
}
