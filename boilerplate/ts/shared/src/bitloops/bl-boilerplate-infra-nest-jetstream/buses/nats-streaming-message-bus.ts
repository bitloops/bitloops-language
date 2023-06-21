import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  NatsConnection,
  JSONCodec,
  JetStreamClient,
  JetStreamPublishOptions,
  consumerOpts,
  createInbox,
  headers,
  MsgHdrs,
  JetStreamSubscription,
} from 'nats';
import { randomUUID } from 'crypto';
import { Infra } from '@bitloops/bl-boilerplate-core';
import { NestjsJetstream } from '../nestjs-jetstream.class';
import { ASYNC_LOCAL_STORAGE, ProvidersConstants } from '../jetstream.constants';
import { ContextPropagation } from './utils/context-propagation';
import { BaseNatsStreamingBus } from './common/base-nats-streaming-bus';

const jsonCodec = JSONCodec();

@Injectable()
export class NatsStreamingMessageBus
  extends BaseNatsStreamingBus
  implements Infra.MessageBus.ISystemMessageBus
{
  // private readonly logger = new Logger(NatsStreamingMessageBus.name);
  constructor(
    @Inject(ProvidersConstants.JETSTREAM_PROVIDER)
    readonly jetStreamProvider: NestjsJetstream,
    @Inject(ASYNC_LOCAL_STORAGE)
    readonly asyncLocalStorage: any,
  ) {
    super(jetStreamProvider, asyncLocalStorage);
  }

  // private getCorelationId() {
  //   return this.asyncLocalStorage.getStore()?.get('correlationId');
  // }

  // private getContext() {
  //   return this.asyncLocalStorage.getStore()?.get('context') || {};
  // }

  async publish(subject: string, message: Infra.MessageBus.Message): Promise<void> {
    const options: Partial<JetStreamPublishOptions> = { msgID: randomUUID() };

    message.correlationId = this.getCorrelationId();
    message.context = this.getContext();
    const headers = this.generateHeaders(message);
    const messageEncoded = jsonCodec.encode(message);

    options.headers = headers;

    try {
      // TODO We could optimize this by knowing in advance all topics we will be publishing to
      // And creating their streams on startup
      const stream = this.getStreamFromSubject(subject);
      await this.jetStreamProvider.createStreamIfNotExists(stream, subject);

      this.logger.log(`Publishing to ${subject}!`);
      await this.js.publish(subject, messageEncoded, options);
    } catch (error: any) {
      // NatsError: 503

      this.logger.error(
        `Error in command request for: ${subject}. Error message: ${error.message}`,
        error.stack,
      );
    }
  }

  async subscribe(
    subject: string,
    handler: Infra.MessageBus.SubscriberHandler<any>,
  ): Promise<Infra.MessageBus.ISubscription> {
    const durableName = NatsStreamingMessageBus.getDurableName(subject);
    const opts = consumerOpts();
    opts.durable(durableName);
    opts.manualAck();
    opts.ackExplicit();
    opts.deliverTo(createInbox());

    const stream = this.getStreamFromSubject(subject);
    await this.jetStreamProvider.createStreamIfNotExists(stream, subject);

    let sub: JetStreamSubscription;
    try {
      this.logger.log(`Subscribing ${subject}!`);
      sub = await this.js.subscribe(subject, opts);
      (async () => {
        for await (const m of sub) {
          try {
            const message = jsonCodec.decode(m.data) as any;

            const contextData = ContextPropagation.createStoreFromMessageHeaders(m.headers);

            await this.asyncLocalStorage.run(contextData, async () => {
              return handler(message);
            });
          } catch (err: any) {
            this.logger.error(`[Message ${subject}]: Error handling message`, err.stack);
          } finally {
            m.ack();
          }
        }
      })();
      return {
        unsubscribe: async () => {
          sub.unsubscribe();
          // Consider what should happen with the subject
          this.logger.log(`[${subject}]: Unsubscribed!`);
        },
      };
    } catch (err: any) {
      this.logger.error(`[Message ${subject}]: Error subscribing to topic`, err.stack);
      return {
        unsubscribe: async () => {
          // pass
        },
      };
    }
  }
  getSubscriberHandlers(topic: string): Infra.MessageBus.SubscriberHandler<any>[] {
    throw new Error('Method not implemented.');
  }

  /* In jetstream the subject must contain the stream name.
   * We assume that the subject is in the format: streamName.[...]
   */
  private getStreamFromSubject(subject: string) {
    return subject.split('.')[0];
  }

  // private generateHeaders(message: Infra.MessageBus.Message): MsgHdrs {
  //   const h = headers();
  //   // TODO We have added ?? {} because of trace message which does not have metadata
  //   // Remove this if trace message gets updated,  Traceable decorator should
  //   // create a new Message class
  //   for (const [key, value] of Object.entries(message.metadata ?? {})) {
  //     if (key === 'context' && value) {
  //       h.append(key, JSON.stringify(value));
  //       continue;
  //     }
  //     const header = value?.toString();
  //     if (header) {
  //       h.append(key, header);
  //     }
  //   }
  //   return h;
  // }

  /**
   *
   * The durable name in NATS JetStream is used to create a durable consumer.
   * A durable consumer is one that can keep track of where it left off,
   * so if the consumer disconnects and then reconnects later,
   * it can resume consuming messages from where it left off
   *
   * A good choice seems to be to use the handler's name, since its shared between all instances
   * If we have 5 pods, the durable name will be the same for all of them,
   * so nothing will be processed twice
   */
  static getDurableName(
    subject: string,

    // handler: Application.ICommandHandler<any, any>,
  ) {
    // Durable name cannot contain a dot
    const subjectWithoutDots = subject.replace(/\./g, '-');
    return `${subjectWithoutDots}`;
    // return `${subjectWithoutDots}-${handler.constructor.name}`;
  }
}
