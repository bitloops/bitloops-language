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

import { plainToInstance } from 'class-transformer';
import { CommandBus } from '.';
import { fail, ok } from '../../Either';
import { DomainError } from '../../domain/DomainError';
import { AppError } from '../../application/AppError';

type TError = typeof DomainError | typeof AppError;
export type TErrors = Array<TError>;
export class ExternalCommandBus extends CommandBus {
  override async sendAndGetResponse<T>(command: ICommand, errorTypes?: TErrors): Promise<T> {
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

        if (this.isErrorMessage(message)) {
          //TODO make 2 interfaces?
          if (!errorTypes) return resolve(fail((message as any).value) as T);
          const errorClass = this.getErrorClass(message, errorTypes);
          const concreteError = plainToInstance(errorClass as any, (message as any).value);

          return resolve(fail(concreteError) as T);
        } else {
          if (this.isVoidOk(message)) {
            return resolve(ok() as T);
          }
          return resolve(ok((message as any).value) as T);
        }
      });
      console.log('sendAndGetResponse: before publishing command', command.commandTopic);
      await this.messageBus.publish(command.commandTopic, command);
    });
  }

  private isErrorMessage(msg: any): boolean {
    if (msg?.value?.errorId !== undefined) return true;
    return false;
  }

  private isVoidOk(message: any): boolean {
    if (JSON.stringify(message) === JSON.stringify({})) return true;
    return false;
  }

  private getErrorClass(message: any, errorTypes: TErrors) {
    const { value: messageValue } = message;
    const { errorId } = messageValue;

    const errorClass = errorTypes.find((errorType) => errorType.errorId === errorId);

    if (!errorClass) {
      throw new Error('No match of error id and error classes');
    }

    return errorClass;
  }
}
