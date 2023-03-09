import { Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountEntity } from '../AccountEntity';
import { NotificationResponse } from '../../structs/NotificationResponse';
import { NotificationTemplateReadRepoPort } from '../../ports/NotificationTemplateReadRepoPort';
export class MarketingNotificationService {
  constructor(private notificationTemplateRepoPort: NotificationTemplateReadRepoPort) {}
  private async isTemplateCorrect(): Promise<boolean> {
    return true;
  }
  public async getNotificationTemplateToBeSent(
    account: AccountEntity,
  ): Promise<Either<NotificationResponse, never>> {
    return ok(account);
  }
}
