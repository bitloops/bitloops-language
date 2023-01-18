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
import { ICommand } from '../../domain/commands/ICommand';
import { IMessage } from '../../domain/messages/IMessage';
import { IMessageBus } from '../../domain/messages/IMessageBus';
import { ICommandBus, RegisterHandler } from '../../domain/commands/ICommandBus';
import { Application, Domain, fail, ok, Either } from '../..';
import { plainToInstance } from 'class-transformer';

export type TErrors = Array<typeof Domain.Error | typeof Application.Error>;
const isMessageError = (msg: any): boolean => {
  if (msg?.value?.errorId !== undefined) return true;
  return false;
};

const getErrorClass = (message: any, errorTypes: TErrors) => {
  const { value: messageValue } = message;
  const { errorId } = messageValue;

  const errorClass = errorTypes.find((errorType) => errorType.errorId === errorId);

  if (!errorClass) {
    throw new Error('No match of error id and error classes');
  }

  return errorClass;
};

const isVoidOk = (message: any): boolean => {
  if (JSON.stringify(message) === JSON.stringify({})) return true;
  return false;
};

// TODO remove logs and fix ts-ignores
export class ExternalCommandBus implements ICommandBus {
  // private prefix: string = "command";
  private messageBus: IMessageBus;

  constructor(messageBus: IMessageBus) {
    this.messageBus = messageBus;
  }

  async register(commandTopic: string, registerHandler: RegisterHandler): Promise<void> {
    const subscriberHandlers = this.messageBus.getSubscriberHandlers(commandTopic);
    if (
      subscriberHandlers === undefined ||
      subscriberHandlers === null ||
      subscriberHandlers.length === 0
    ) {
      console.log('going to subscribe', commandTopic);
      // @ts-ignore: TS2345
      await this.messageBus.subscribe(commandTopic, registerHandler);
    }
  }

  async send(command: ICommand): Promise<void> {
    return this.messageBus.publish(command.commandTopic, command);
  }

  async sendAndGetResponse<T>(command: ICommand, errorTypes: TErrors): Promise<T> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      console.log(
        'sendAndGetResponse: command.metadata.responseTopic',
        command.metadata?.responseTopic,
      );
      if (!command?.metadata?.responseTopic) {
        return reject('No response topic');
      }
      await this.messageBus.subscribe(command.metadata.responseTopic, (message: IMessage) => {
        console.log('sendAndGetResponse: message', message);

        if (isMessageError(message)) {
          const errorClass = getErrorClass(message, errorTypes);
          const concreteError = plainToInstance(errorClass, (message as any).value);

          return resolve(fail(concreteError) as T);
        } else {
          if (isVoidOk(message)) {
            return resolve(ok() as T);
          }
          return resolve(ok((message as any).value) as T);
        }
      });
      console.log('sendAndGetResponse: before publishing command', command.commandTopic);
      await this.messageBus.publish(command.commandTopic, command);
    });
  }

  async unregister(commandTopic: string): Promise<void> {
    const subscriberHandlers = this.messageBus.getSubscriberHandlers(commandTopic);
    console.log({ subscriberHandlers });
    if (subscriberHandlers) {
      const [subscriberHandler] = subscriberHandlers;
      await this.messageBus.unsubscribe(commandTopic, subscriberHandler);
    }
  }
}
