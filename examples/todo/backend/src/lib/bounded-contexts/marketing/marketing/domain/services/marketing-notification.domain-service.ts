import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';
import { NotificationTemplateReadModel } from '../notification-template.read-model';
import { UserEntity } from '../user.entity';
import { NotificationTemplateInput } from '../../structs/notification-template-input.struct';
import { NotificationTemplateReadRepoPort } from '../../ports/notification-template-read.repo-port';
export class MarketingNotificationDomainService {
  constructor(
    private notificationTemplateRepo: NotificationTemplateReadRepoPort
  ) {}
  public async getNotificationTemplateToBeSent(
    user: UserEntity
  ): Promise<
    Either<NotificationTemplateInput, Application.Repo.Errors.Unexpected>
  > {
    const emailOrigin = 'marketing@bitloops.com';
    let notificationTemplate: NotificationTemplateReadModel = null;
    if (user.isFirstTodo()) {
      const notificationTemplateResponse =
        await this.notificationTemplateRepo.getByType('firstTodo');
      if (notificationTemplateResponse.isFail()) {
        return fail(notificationTemplateResponse.value);
      }
      notificationTemplate = notificationTemplateResponse.value;
    } else {
      notificationTemplate = null;
    }
    return ok({
      emailOrigin: emailOrigin,
      notificationTemplate: notificationTemplate,
    });
  }
}
