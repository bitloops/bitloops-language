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
import { v4 as uuidv4 } from 'uuid';
import { IEvent } from './IEvent';
import { config } from '../../config';
import { getTopic } from '../../helpers';
import { CommandMetadata } from '../commands/ICommand';

const { TOPIC_DELIMITER, TOPIC_PREFIXES } = config;

export abstract class Event implements IEvent {
  public static readonly prefix: string = TOPIC_PREFIXES.Event;

  public readonly uuid: string;
  protected createdTimestamp: number;
  private metadata?: CommandMetadata;
  public eventTopic: string;
  public readonly fromContextId: string;

  constructor(eventName: string, fromContextId: string, uuid?: string) {
    this.uuid = uuid || uuidv4();
    this.createdTimestamp = Date.now();
    this.eventTopic = Event.getEventTopic(eventName, fromContextId);
    this.fromContextId = fromContextId;
  }

  setMetadata(metadata: CommandMetadata) {
    this.metadata = metadata;
  }

  static getEventTopic(eventName: string, fromContextId: string) {
    return getTopic({
      topicPrefix: Event.prefix,
      name: eventName,
      contextId: fromContextId,
      topicDelimiter: TOPIC_DELIMITER,
    });
  }
}
