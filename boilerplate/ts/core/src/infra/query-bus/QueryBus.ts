/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { IMessage } from '../../domain/messages/IMessage';
import { IMessageBus } from '../../domain/messages/IMessageBus';
import { IQuery } from '../../domain/queries/IQuery';
import { IQueryBus, RegisterHandler } from '../../domain/queries/IQueryBus';

export class QueryBus implements IQueryBus {
  protected messageBus: IMessageBus;

  constructor(messageBus: IMessageBus) {
    this.messageBus = messageBus;
  }

  async register<T extends IQuery>(
    queryName: string,
    registerHandler: RegisterHandler<T>,
  ): Promise<void> {
    await this.messageBus.subscribe(queryName, registerHandler);
  }
  async unregister(queryName: string): Promise<void> {
    const subscriberHandlers = this.messageBus.getSubscriberHandlers(queryName);
    if (subscriberHandlers) {
      const [subscriberHandler] = subscriberHandlers;
      await this.messageBus.unsubscribe(queryName, subscriberHandler);
    }
  }
  async query<T>(query: IQuery): Promise<T> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      console.log('query: query.metadata.responseTopic', query.metadata?.responseTopic);
      if (!query?.metadata?.responseTopic) {
        return reject('No response topic');
      }
      await this.messageBus.subscribe(query.metadata.responseTopic, (message: IMessage) => {
        console.log('query: message', message);
        return resolve(message as T);
      });
      console.log('query: before publishing query', query.queryTopic);
      await this.messageBus.publish(query.queryTopic, query);
    });
  }
}
