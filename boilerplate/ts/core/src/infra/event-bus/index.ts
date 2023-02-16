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

export class EventBus implements IEventBus {
  private messageBus: IMessageBus;

  constructor(messageBus: IMessageBus) {
    this.messageBus = messageBus;
  }

  async subscribe<T extends IEvent>(topic: string, eventHandler: EventHandler<T>): Promise<void> {
    console.log('EventBus subscribe: topic', topic);
    await this.messageBus.subscribe(topic, eventHandler);
  }

  async publish(topic: string, message: IEvent): Promise<void> {
    console.log('EventBus publish: topic', topic);
    return this.messageBus.publish(topic, message);
  }

  async unsubscribe<T extends IEvent>(topic: string, eventHandler: EventHandler<T>): Promise<void> {
    await this.messageBus.unsubscribe(topic, eventHandler);
  }

  async publishMany(events: Array<IEvent>): Promise<void> {
    const eventsWithTopic = events.map((event) => {
      return { message: event, topic: event.eventTopic };
    });
    for (const event of eventsWithTopic) {
      await this.publish(event.topic, event.message);
    }
  }
}
