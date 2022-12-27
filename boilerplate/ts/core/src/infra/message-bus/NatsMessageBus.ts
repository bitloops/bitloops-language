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
import { JSONCodec, NatsConnection, connect, Subscription } from 'nats';
import { SubscriberHandler } from '../../domain/messages/IMessageBus';
import { IExternalMessageBus } from '../../domain/messages/IExternalMessageBus';
import { IMessage } from '../../domain/messages/IMessage';

type TopicSubscriptionHandlers = {
  subscription: Subscription;
  subscriberHandlers: SubscriberHandler[];
};

export class NatsMessageBus implements IExternalMessageBus {
  private sc: any = JSONCodec();
  //TODO singleton for connection
  private nc: NatsConnection | null;
  public topicSubscriptionHandlers: Record<string, TopicSubscriptionHandlers> = {};

  constructor() {
    this.nc = null;
  }

  getSubscriberHandlers(topic: string): SubscriberHandler[] {
    return this.topicSubscriptionHandlers[topic]?.subscriberHandlers;
  }

  async connect() {
    const nc = await connect({ servers: '127.0.0.1:4222' });
    this.nc = nc;
    console.log('nats connected');
  }

  public async subscribe(topic: string, subscriberHandler: SubscriberHandler) {
    if (!this.nc) {
      throw new Error('Nats not connected');
    }

    if (!this.topicSubscriptionHandlers[topic]) {
      this.topicSubscriptionHandlers[topic] = {
        subscription: this.nc.subscribe(topic),
        subscriberHandlers: [subscriberHandler],
      };
    } else {
      this.topicSubscriptionHandlers[topic].subscriberHandlers.push(subscriberHandler);
    }
    // console.log();

    (async () => {
      //TODO fix ts-ignore issue
      // @ts-ignore
      for await (const m of this.topicSubscriptionHandlers[topic].subscription) {
        console.log('message received', m.data);
        this.topicSubscriptionHandlers[topic].subscriberHandlers.forEach((subscriberHandler) =>
          subscriberHandler(this.sc.decode(m.data)),
        );
        // subscriberHandler(this.sc.decode(m.data));
        // console.log(`[${sub.getProcessed()}]: ${this.sc.decode(m.data)}`);
      }
      console.log('subscription closed');
    })();
  }

  public async publish(topic: string, message: IMessage) {
    if (!this.nc) {
      throw new Error('Nats not connected');
    }
    this.nc.publish(topic, this.sc.encode(message));
  }

  public async unsubscribe(topic: string, subscriberHandler: SubscriberHandler) {
    if (!this.topicSubscriptionHandlers[topic]) {
      return;
    }

    this.topicSubscriptionHandlers[topic].subscriberHandlers = this.topicSubscriptionHandlers[
      topic
    ].subscriberHandlers.filter((item) => item !== subscriberHandler);

    if (this.topicSubscriptionHandlers[topic].subscriberHandlers.length === 0) {
      this.topicSubscriptionHandlers[topic].subscription.unsubscribe();
    }
  }
}
