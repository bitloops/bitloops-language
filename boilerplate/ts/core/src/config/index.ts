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

// @TEMPLATE import { CONTEXT_ID as ${camelCase(BOUNDED_CONTEXT)}ContextId } from '../BoundedContexts/${kebab(BOUNDED_CONTEXT)}/config';

// TODO Remove comments
export enum CONTEXT_TYPES {
  InProcess = 'InProcess',
  External = 'External',
}

export enum TOPIC_PREFIXES {
  Event = 'event',
  Command = 'command',
  Query = 'query',
}
const TOPIC_DELIMITER = '.';
const INTEGRATION_EVENT_TOPIC_PREFIX = 'integration';
const PROCESS_MANAGER_EVENT_TOPIC_PREFIX = 'orchestrated';

export enum MESSAGE_BUS {
  EVENT_BUS = 'EVENT_BUS',
  COMMAND_BUS = 'COMMAND_BUS',
  INTEGRATION_EVENT_BUS = 'INTEGRATION_EVENT_BUS',
  QUERY_BUS = 'QUERY_BUS',
}

type Config = {
  TOPIC_DELIMITER: string;
  INTEGRATION_EVENT_TOPIC_PREFIX: string;
  PROCESS_MANAGER_EVENT_TOPIC_PREFIX: string;
};
// TODO maybe getting it from the project find away to get it all from the project
const config: Config = {
  TOPIC_DELIMITER,
  INTEGRATION_EVENT_TOPIC_PREFIX,
  PROCESS_MANAGER_EVENT_TOPIC_PREFIX,
};

type ApplicationConfig = {
  BUSES: Record<MESSAGE_BUS, CONTEXT_TYPES>;
};

export { Config, config, ApplicationConfig };
