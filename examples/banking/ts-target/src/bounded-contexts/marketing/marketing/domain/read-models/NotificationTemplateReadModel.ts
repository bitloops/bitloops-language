export type TNotificationTemplateSnapshot = {
  id: string;
  type: string;
  template: {
    text: string;
    variables: string[];
  };
};

export class NotificationTemplateReadModel {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly template: {
      text: string;
      variables: string[];
    },
  ) {}

  static fromPrimitives(snapshot: TNotificationTemplateSnapshot): NotificationTemplateReadModel {
    return new NotificationTemplateReadModel(snapshot.id, snapshot.type, snapshot.template);
  }
}
