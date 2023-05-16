import { Application, Either, fail } from '@bitloops/bl-boilerplate-core';
import { NotificationTemplateInput } from '../../structs/notification-template-input.struct';
import { NotificationTemplateReadRepoPort } from '../../ports/notification-template-read.repo-port';
export class MarketingNotificationDomainService {
  constructor(private notificationTemplateRepo: NotificationTemplateReadRepoPort) {}
  public async getNotificationTemplateToBeSent(): Promise<
    Either<NotificationTemplateInput, Application.Repo.Errors.Unexpected>
  > {
    const notificationTemplateResponse = await this.notificationTemplateRepo.getByType('firstTodo');
    if (notificationTemplateResponse.isFail()) {
      return fail(notificationTemplateResponse.value);
    }
  }
}
