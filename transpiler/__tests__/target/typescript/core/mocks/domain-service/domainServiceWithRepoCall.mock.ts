import { Either } from '@bitloops/bl-boilerplate-core';
import { NotificationTemplateReadRepoPort } from '../../ports/NotificationTemplateReadRepoPort';
export class MarketingNotificationService {
  constructor(private notificationTemplateRepoPort: NotificationTemplateReadRepoPort) {}
  public async getNotificationTemplateToBeSent(): Promise<Either<void, never>> {
    const notificationTemplate = await this.notificationTemplateRepoPort.get();
    const newNotificationTemplate = notificationTemplate.value;
  }
}
