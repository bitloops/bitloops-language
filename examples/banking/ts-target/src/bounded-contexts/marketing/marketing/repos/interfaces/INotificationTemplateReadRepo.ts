import { Application } from '@bitloops/bl-boilerplate-core';
import { NotificationTemplateReadModel } from '../../domain/read-models/NotificationTemplateReadModel.js';

export interface INotificationTemplateReadRepo
  extends Application.Repo.ICRUDReadPort<NotificationTemplateReadModel> {
  getByTypeAndDeposits(
    type: string,
    variables: string[],
  ): Promise<NotificationTemplateReadModel | null>;
  getByType(type: string): Promise<NotificationTemplateReadModel | null>;
}
