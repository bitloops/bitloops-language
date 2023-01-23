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
import { IEvent, TEventMetadata } from './IEvent';
import { TOPIC_PREFIXES } from '../../config';
import { createUUIDv4, getTopic } from '../../helpers';

export type TEventInputMetadata = {
  id?: string;
  version?: string;
  fromContextId: string;
};

export abstract class Event implements IEvent {
  public static readonly prefix: TOPIC_PREFIXES.Event = TOPIC_PREFIXES.Event;
  public eventTopic: string;
  public metadata: Readonly<TEventMetadata>;

  constructor(eventName: string, public data: any, metadata: TEventInputMetadata) {
    this.metadata = {
      id: metadata.id || createUUIDv4(),
      createdAtTimestamp: Date.now(),
      version: metadata.version,
      fromContextId: metadata.fromContextId,
    };

    this.eventTopic = Event.getEventTopic(eventName, metadata.fromContextId);
  }

  static getEventTopic(eventName: string, fromContextId: string) {
    return getTopic(Event.prefix, eventName, fromContextId);
  }
}
