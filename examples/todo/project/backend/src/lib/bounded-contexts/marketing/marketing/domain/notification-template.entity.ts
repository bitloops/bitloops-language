import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { NotificationTemplateProps } from './notification-template.props';
export type TNotificationTemplateEntityPrimitives = {
  id?: string;
  template: string;
  type: string;
};
export class NotificationTemplateEntity extends Domain.Aggregate<NotificationTemplateProps> {
  private constructor(props: NotificationTemplateProps) {
    super(props, props.id);
  }
  public static create(
    props: NotificationTemplateProps
  ): Either<NotificationTemplateEntity, never> {
    const notificationTemplate = new NotificationTemplateEntity(props);
    return ok(notificationTemplate);
  }
  get id() {
    return this._id;
  }
  get template(): string {
    return this.props.template;
  }
  get type(): string {
    return this.props.type;
  }
  public static fromPrimitives(
    data: TNotificationTemplateEntityPrimitives
  ): NotificationTemplateEntity {
    const NotificationTemplateEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      template: data.template,
      type: data.type,
    };
    return new NotificationTemplateEntity(NotificationTemplateEntityProps);
  }
  public toPrimitives(): TNotificationTemplateEntityPrimitives {
    return {
      id: this.id.toString(),
      template: this.template,
      type: this.type,
    };
  }
}
