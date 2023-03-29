import { Inject, Injectable } from '@nestjs/common';
import { NatsConnection, JSONCodec, headers, Msg, MsgHdrs } from 'nats';
import { Application, Infra } from '@bitloops/bl-boilerplate-core';
import { ASYNC_LOCAL_STORAGE, METADATA_HEADERS, ProvidersConstants } from '../jetstream.constants';
import { ContextPropagation } from './utils/context-propagation';

const jsonCodec = JSONCodec();

@Injectable()
export class NatsPubSubCommandBus implements Infra.CommandBus.IPubSubCommandBus {
  private nc: NatsConnection;
  private static commandPrefix = 'Commands_';

  constructor(
    @Inject(ProvidersConstants.JETSTREAM_PROVIDER) private readonly nats: any,
    @Inject(ASYNC_LOCAL_STORAGE)
    private readonly asyncLocalStorage: any,
  ) {
    this.nc = this.nats.getConnection();
  }

  async publish(command: Application.Command): Promise<void> {
    const topic = NatsPubSubCommandBus.getTopicFromCommandInstance(command);
    console.log('Publishing in :', topic);
    const headers = this.generateHeaders(command);

    this.nc.publish(topic, jsonCodec.encode(command), { headers });
  }

  async request(command: Application.Command): Promise<any> {
    const topic = NatsPubSubCommandBus.getTopicFromCommandInstance(command);

    console.log('Publishing in :', topic);

    const headers = this.generateHeaders(command);

    try {
      const response = await this.nc.request(topic, jsonCodec.encode(command), {
        headers,
        timeout: 10000,
      });
      return jsonCodec.decode(response.data);
    } catch (error) {
      console.log('Error in command request', error);
    }
  }

  async pubSubSubscribe(subject: string, handler: Application.ICommandHandler<any, any>) {
    try {
      console.log('Subscribing to:', subject);
      const sub = this.nc.subscribe(subject);
      (async () => {
        for await (const m of sub) {
          const command = jsonCodec.decode(m.data);

          const contextData = ContextPropagation.createStoreFromMessageHeaders(m.headers);

          await this.asyncLocalStorage.run(contextData, async () => {
            return this.handleReceivedCommand(handler, command, m);
          });
        }
      })();
    } catch (err) {
      console.log('Error in command-bus subscribe::', err);
    }
  }

  private generateHeaders(command: Application.Command): MsgHdrs {
    const h = headers();
    for (const [key, value] of Object.entries(command.metadata)) {
      if (key === 'context' && value) {
        h.append(key, JSON.stringify(value));
        continue;
      }
      const header = value?.toString();
      if (header) {
        h.append(key, header);
      }
    }
    return h;
  }

  static getTopicFromHandler(handler: Application.ICommandHandler<any, any>): string {
    const command = handler.command;
    const boundedContext = handler.boundedContext;

    return `${this.commandPrefix}${boundedContext}.${command.name}`;
  }

  static getTopicFromCommandInstance(command: Application.Command): string {
    const boundedContext = command.metadata.boundedContextId;
    const topic = `${this.commandPrefix}${boundedContext}.${command.constructor.name}`;
    return topic;
  }

  private async handleReceivedCommand(
    handler: Application.ICommandHandler<any, any>,
    command: any,
    m: Msg,
  ) {
    const reply = await handler.execute(command);
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
    if (!reply) return;
    else console.error('Reply is neither ok nor error:', reply);
  }
}
