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

import { UUIDv4 } from '../UUIDv4.js';
import { TContext } from '../context.js';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMessage {}

export type TMessageMetadata = {
  createdTimestamp: number;
  messageId: string;
  correlationId?: string;
  orchestratorInstanceIdsStr: string;
  name: string;
  context: TContext | Record<string, never>; // type of empty object
};

export abstract class Message implements IMessage {
  metadata: TMessageMetadata;
  constructor(metadata?: Partial<TMessageMetadata>) {
    this.metadata = {
      createdTimestamp: Date.now(),
      messageId: new UUIDv4().toString(),
      correlationId: metadata?.correlationId,
      context: metadata?.context || {},
      name: this.constructor.name,
      orchestratorInstanceIdsStr: metadata?.orchestratorInstanceIdsStr || '',
    };
  }

  set correlationId(correlationId: string) {
    this.metadata.correlationId = correlationId;
  }

  set orchestratorInstanceIdsStr(orchestratorInstanceIdsStr: string) {
    this.metadata.orchestratorInstanceIdsStr = orchestratorInstanceIdsStr;
  }

  set context(context: TContext) {
    this.metadata.context = context;
  }
}
