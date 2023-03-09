import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { NotificationTemplateReadModel } from '../../domain/read-models/NotificationTemplateReadModel';
import { INotificationTemplateReadRepo } from '../interfaces/INotificationTemplateReadRepo';

const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE || 'marketing';
const MONGO_DB_TODO_COLLECTION = process.env.MONGO_DB_TODO_COLLECTION || 'notificationTemplates';

export class MongoNotificationTemplateReadRepo implements INotificationTemplateReadRepo {
  private collectionName = MONGO_DB_TODO_COLLECTION;
  private dbName = MONGO_DB_DATABASE;
  private collection: Mongo.Collection;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }
  getAll(): Promise<NotificationTemplateReadModel[] | null> {
    throw new Error('Method not implemented.');
  }

  async getById(notificationTemplateId: string): Promise<NotificationTemplateReadModel | null> {
    const res = (await this.collection.findOne({
      _id: notificationTemplateId.toString(),
    })) as any;
    if (res === null) return res;
    return NotificationTemplateReadModel.fromPrimitives({
      ...res,
      id: res._id.toString(),
    });
  }

  async getByType(type: string): Promise<NotificationTemplateReadModel | null> {
    const res = (await this.collection.findOne({
      type,
    })) as any;
    if (res === null) return res;
    return NotificationTemplateReadModel.fromPrimitives({
      ...res,
      id: res._id.toString(),
    });
  }
}
