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

import { Event } from './Event';

type TIntegrationEventInputMetadata = {
  id?: string;
  version?: string;
  fromContextId: string;
};

export abstract class IntegrationEvent<T> extends Event<T> {
  constructor(eventTopic: string, data: T, metadata: TIntegrationEventInputMetadata) {
    super(eventTopic, data, metadata);
    this.metadata = { ...this.metadata, version: metadata.version };
  }
}
