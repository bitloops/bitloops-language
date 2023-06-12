export type TNotificationTemplateReadModelSnapshot = {
  id: string;
  type: string;
  template: string;
};
export class NotificationTemplateReadModel {
  public id: string;
  public type: string;
  public template: string;
  constructor(props: TNotificationTemplateReadModelSnapshot) {
    this.id = props.id;
    this.type = props.type;
    this.template = props.template;
  }
  static fromPrimitives(
    snapshot: TNotificationTemplateReadModelSnapshot
  ): NotificationTemplateReadModel {
    return new NotificationTemplateReadModel(snapshot);
  }
}
