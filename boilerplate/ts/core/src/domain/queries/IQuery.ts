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
import { TContext } from '../context';
import { IMessage } from '../messages/IMessage';

export type QueryMetadata = {
  boundedContextId: string;
  createdTimestamp: number;
  messageId: string;
  correlationId: string;
  context: TContext | Record<string, never>; // type of empty object
};

export interface IQuery extends IMessage {
  metadata: QueryMetadata;
}

export abstract class Query implements IQuery {
  [x: string]: any;
  abstract metadata: QueryMetadata;
}
