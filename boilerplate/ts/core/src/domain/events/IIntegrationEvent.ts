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

import { Message } from '../messages/IMessage.js';
import { IEvent, TEventMetadata } from './IEvent';

export interface IIntegrationEventInputMetadata extends TEventMetadata {
  version: string;
}

export interface IIntegrationEvent<T> extends IEvent<T> {
  metadata: IIntegrationEventInputMetadata;
}

export abstract class IntegrationEvent<T> extends Message implements IIntegrationEvent<T> {
  public readonly payload: T;
  public aggregateId: any;
  public declare readonly metadata: IIntegrationEventInputMetadata;
  constructor(
    boundedContextId: string,
    payload: T,
    version: string,
    metadata?: Partial<IIntegrationEventInputMetadata>,
  ) {
    super(metadata);
    this.metadata.boundedContextId = boundedContextId;
    this.metadata.version = version;
    this.payload = payload;
    // Object.assign(this, payload);
  }
}
