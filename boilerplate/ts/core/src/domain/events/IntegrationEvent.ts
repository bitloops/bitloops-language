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
// import { config } from '../../config';
import { Container } from '../../Container';
import { getIntegrationTopic } from '../../helpers';
import { Event } from './Event';
import { IIntegrationEvent } from './IIntegrationEvent';

export abstract class IntegrationEvent<T> extends Event implements IIntegrationEvent {
  public readonly data: T;
  private version: string;

  constructor(eventName: string, fromContextId: string, data: T, version: string, uuid?: string) {
    super(eventName, fromContextId, uuid);
    this.data = data;
    this.version = version;
    this.eventTopic = IntegrationEvent.getIntegrationEventTopic(this.eventTopic);
  }

  static getIntegrationEventTopic(domainEventTopic: string): string {
    const { INTEGRATION_EVENT_TOPIC_PREFIX, TOPIC_DELIMITER } = Container.getConfig();

    return getIntegrationTopic(domainEventTopic, INTEGRATION_EVENT_TOPIC_PREFIX, TOPIC_DELIMITER);
  }
}
