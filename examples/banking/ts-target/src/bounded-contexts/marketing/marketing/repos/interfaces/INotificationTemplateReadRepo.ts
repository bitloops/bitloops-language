import { Application } from '@bitloops/bl-boilerplate-core';
import { NotificationTemplateReadModel } from '../../domain/read-models/NotificationTemplateReadModel';

export interface INotificationTemplateReadRepo
  extends Application.Repo.ICRUDReadPort<NotificationTemplateReadModel> {
  getByType(type: string): Promise<NotificationTemplateReadModel | null>;
}
