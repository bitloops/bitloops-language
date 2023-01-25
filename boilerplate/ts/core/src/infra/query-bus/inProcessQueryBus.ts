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

export class InProcessQueryBus implements IQueryBus {
  private messageBus: IMessageBus;

  constructor(messageBus: IMessageBus) {
    this.messageBus = messageBus;
  }

  async register(queryName: string, registerHandler: RegisterHandler): Promise<void> {
    await this.messageBus.subscribe(queryName, registerHandler);
  }
  async unregister(queryName: string, eventHandler: RegisterHandler): Promise<void> {
    await this.messageBus.unsubscribe(queryName, eventHandler);
  }
  async query(query: IQuery): Promise<IMessage> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      console.log('query: query.metadata.responseTopic', query.metadata?.responseTopic);
      if (!query?.metadata?.responseTopic) {
        return reject('No response topic');
      }
      await this.messageBus.subscribe(query.metadata.responseTopic, (message: IMessage) => {
        console.log('query: message', message);
        return resolve(message);
      });
      console.log('query: before publishing query', query.queryTopic);
      await this.messageBus.publish(query.queryTopic, query);
    });
  }
}
