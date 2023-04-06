import { Either, fail, ok } from '@bitloops/bl-boilerplate-core';
import { NotificationTemplateReadModel } from '../NotificationTemplateReadModel';
import { UserEntity } from '../UserEntity';
import { NotificationTemplateInput } from '../../structs/NotificationTemplateInput';
import { NotificationTemplateReadRepoPort } from '../../ports/NotificationTemplateReadRepoPort';
export class MarketingNotificationDomainService {
  constructor(private notificationTemplateRepo: NotificationTemplateReadRepoPort) {}
  public async getNotificationTemplateToBeSent(
    user: UserEntity,
  ): Promise<Either<NotificationTemplateInput, never>> {
    const emailOrigin = 'marketing@bitloops.com';
    let notificationTemplate: NotificationTemplateReadModel = null;
    if (user.isFirstTodo()) {
      const notificationTemplateResponse = await this.notificationTemplateRepo.getByType(
        'firstTodo',
      );
      if (notificationTemplateResponse.isFail()) {
        return fail(notificationTemplateResponse.value);
      }
      notificationTemplate = notificationTemplateResponse.value;
    } else {
      notificationTemplate = null;
    }
    return ok({ emailOrigin: emailOrigin, notificationTemplate: notificationTemplate });
  }
}
