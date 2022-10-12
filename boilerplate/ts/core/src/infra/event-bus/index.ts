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
import { IEvent } from '../../domain/events/IEvent';
import { IEventBus, EventHandler } from '../../domain/events/IEventBus';
import { IMessageBus } from '../../domain/messages/IMessageBus';

//TODO try to add T in class declaration
export class EventBus implements IEventBus {
  // private prefix: string = "event";
  private messageBus: IMessageBus;

  constructor(messageBus: IMessageBus) {
    this.messageBus = messageBus;
  }

  async subscribe(topic: string, eventHandler: EventHandler): Promise<void> {
    console.log('EventBus subscribe: topic', topic);
    // @ts-ignore: TS2345
    await this.messageBus.subscribe(topic, eventHandler);
  }

  async publish(topic: string, message: IEvent): Promise<void> {
    console.log('EventBus publish: topic', topic);
    return this.messageBus.publish(topic, message);
  }

  async unsubscribe(topic: string, eventHandler: EventHandler): Promise<void> {
    // @ts-ignore: TS2345
    await this.messageBus.unsubscribe(topic, eventHandler);
  }
}
