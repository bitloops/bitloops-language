import { Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountEntity } from '../account.entity';
import { NotificationResponse } from '../../structs/notification-response.struct';
import { NotificationTemplateReadRepoPort } from '../../ports/notification-template-read.repo-port';
export class MarketingNotificationService {
  constructor(private notificationTemplateRepoPort: NotificationTemplateReadRepoPort) {}
  public async getNotificationTemplateToBeSent(
    account: AccountEntity,
  ): Promise<Either<NotificationResponse, never>> {
    return ok(account);
  }
}
