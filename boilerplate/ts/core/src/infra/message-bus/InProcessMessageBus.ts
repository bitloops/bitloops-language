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
import { IInProcessMessageBus } from '../../domain/messages/IInProcessMessageBus';
import { SubscriberHandler } from '../../domain/messages/IMessageBus';
import { IMessage } from '../../domain/messages/IMessage';

export class InProcessMessageBus implements IInProcessMessageBus {
  private subscribers: Record<string, SubscriberHandler[]> = {};

  //   constructor() {} // public defaultTriesCount: number = 3 // Count of attempts to send to the receiver

  public getSubscriberHandlers(topic: string): SubscriberHandler[] {
    if (!this.subscribers[topic]) {
      return [];
    }
    return this.subscribers[topic];
  }

  public async subscribe(topic: string, subscriberHandler: SubscriberHandler) {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
    }

    this.subscribers[topic].push(subscriberHandler);
  }

  public async unsubscribe(topic: string, subscriberHandler: SubscriberHandler) {
    if (!this.subscribers[topic]) {
      return;
    }

    this.subscribers[topic] = this.subscribers[topic].filter((item) => item !== subscriberHandler);
  }

  public async publish(topic: string, message: IMessage): Promise<void> {
    const subscriberHandlers = this.getSubscriberHandlers(topic);
    subscriberHandlers.map((handler) => {
      handler(message);
    });
  }
}
