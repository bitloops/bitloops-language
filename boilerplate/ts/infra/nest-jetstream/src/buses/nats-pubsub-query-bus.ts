import { Inject, Injectable } from '@nestjs/common';
import { NatsConnection, JSONCodec, headers, MsgHdrs } from 'nats';
import { Application, Infra } from '@bitloops/bl-boilerplate-core';
import { ASYNC_LOCAL_STORAGE, ProvidersConstants } from '../jetstream.constants';
import { AsyncLocalStorage } from 'node:async_hooks';
import { ContextPropagation } from './utils/context-propagation';

const jsonCodec = JSONCodec();

@Injectable()
export class NatsPubSubQueryBus implements Infra.QueryBus.IQueryBus {
  private nc: NatsConnection;
  private static queryPrefix = 'Query_';
  constructor(
    @Inject(ProvidersConstants.JETSTREAM_PROVIDER) private readonly nats: any,
    // @Optional()
    @Inject(ASYNC_LOCAL_STORAGE)
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
  ) {
    this.nc = this.nats.getConnection();
  }

  async request(query: any): Promise<any> {
    const topic = NatsPubSubQueryBus.getTopicFromQueryInstance(query);
    console.log('Requesting query:', topic);

    const headers = this.generateHeaders(query);

    try {
      const response = await this.nc.request(topic, jsonCodec.encode(query), {
        headers,
        timeout: 10000,
      });

      const data = jsonCodec.decode(response.data);
      console.log('Response in query request:', data);
      return data;
    } catch (err) {
      console.log('Error in query request:', err);
    }
  }

  async pubSubSubscribe(subject: string, handler: Application.IQueryHandler<any, any>) {
    try {
      console.log('Subscribing query to:', subject);
      // this.logger.log(`
      //   Subscribing ${subject}!
      // `);
      const sub = this.nc.subscribe(subject);
      (async () => {
        for await (const m of sub) {
          const query = jsonCodec.decode(m.data);

          const contextData = ContextPropagation.createStoreFromMessageHeaders(m.headers);
          const reply = await this.asyncLocalStorage.run(contextData, () => {
            return handler.execute(query);
          });
          if (reply.isOk && reply.isOk() && m.reply) {
            return this.nc.publish(
              m.reply,
              jsonCodec.encode({
                isOk: true,
                data: reply.value,
              }),
            );
          } else if (reply.isFail && reply.isFail() && m.reply) {
            return this.nc.publish(
              m.reply,
              jsonCodec.encode({
                isOk: false,
                error: reply.value,
              }),
            );
          }

          console.log(`[${sub.getProcessed()}]: ${JSON.stringify(jsonCodec.decode(m.data))}`);
        }
        console.log('subscription closed');
      })();
    } catch (err) {
      console.log('Error in query subscription:', err);
    }
  }

  private generateHeaders(query: Application.IQuery): MsgHdrs {
    const h = headers();
    for (const [key, value] of Object.entries(query.metadata)) {
      if (key === 'context' && value) {
        h.append(key, JSON.stringify(value));
        continue;
      }
      if (value) {
        h.append(key, value.toString());
      }
    }
    return h;
  }

  static getTopicFromHandler(handler: Application.IQueryHandler<any, any>): string {
    const query = handler.query;
    const boundedContext = handler.boundedContext;

    return `${this.queryPrefix}${boundedContext}.${query.name}`;
  }

  static getTopicFromQueryInstance(query: Application.IQuery): string {
    const boundedContext = query.metadata.boundedContextId;
    const topic = `${this.queryPrefix}${boundedContext}.${query.constructor.name}`;
    return topic;
  }
}
