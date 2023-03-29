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
import { config } from '../../config';
import { TContext } from '../context';

export type CommandMetadata = {
  // responseTopic: string;
  toContextId: string;
  createdTimestamp: number;
  messageId?: string;
  correlationId?: string;
};

export interface ICommand {
  uuid?: string;
  metadata: CommandMetadata;
  ctx?: TContext;
}

export abstract class Command implements ICommand {
  [x: string]: any;
  abstract metadata: CommandMetadata;
  // private static prefix: TOPIC_PREFIXES.Command = TOPIC_PREFIXES.Command;

  // public readonly uuid: string;
  // private createdTimestamp: number;
  // public readonly metadata?: CommandMetadata;
  // public readonly commandTopic: string;

  // constructor(
  //   commandName: string,
  //   toContextId: string,
  //   createdTimestamp?: number,
  // ) {
  //   this.uuid = createUUIDv4();
  //   this.createdTimestamp = createdTimestamp || Date.now();
  //   this.commandTopic = Command.getCommandTopic(commandName, toContextId); //`${toContextId}${TOPIC_DELIMITER}${commandName}`;
  //   this.metadata = {
  //     responseTopic: `${commandName}${TOPIC_DELIMITER}${this.uuid}`,
  //     toContextId,
  //     createdTimestamp: this.createdTimestamp,
  //   };
  // }

  // // TODO somehow avoid implementing this method in every child command
  // static getCommandTopic(commandName: string, toContextId: string): string {
  //   return getTopic(Command.prefix, commandName, toContextId);
  // }
}
