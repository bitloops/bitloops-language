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
import { GenericMessageHandler } from '../messages/IMessageBus';
// import { TErrors } from '../../infra/command-bus/externalCommandBus';
import { CommandHandler } from '../../application/UseCase';

// export interface IPubSubCommandBus {
//   register<T extends ICommand>(
//     commandName: string,
//     registerHandler: RegisterHandler<T>,
//   ): Promise<void>;
//   unregister(commandName: string): Promise<void>;
//   send(command: ICommand): Promise<void>;
//   request<T = any>(command: ICommand, errorTypes?: TErrors): Promise<T>;
// }
import { Command } from './Command';

export interface IPubSubCommandBus {
  publish(command: any): Promise<void>;
  request(command: any): Promise<any>;
  pubSubSubscribe(
    subject: string,
    handler: CommandHandler<any, any>,
  ): Promise<void>;
}

export interface IStreamCommandBus {
  publish(command: Command): Promise<void>;
  subscribe(subject: string, handler: CommandHandler<any, any>): Promise<void>;
}
