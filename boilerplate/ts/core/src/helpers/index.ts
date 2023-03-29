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
import { randomUUID } from 'crypto';
import { config, TOPIC_PREFIXES } from '../config';

type GetTopicTypeParams = {
  topicPrefix: TOPIC_PREFIXES;
  name: string;
  contextId: string;
  topicDelimiter: string;
};

const getTopicString = ({
  topicPrefix,
  name,
  contextId,
  topicDelimiter,
}: GetTopicTypeParams) => {
  return `${topicPrefix}${topicDelimiter}${contextId}${topicDelimiter}${name}`;
};

export const getTopic = (
  topicPrefix: TOPIC_PREFIXES,
  name: string,
  contextId: string,
) => {
  return getTopicString({
    topicPrefix,
    name,
    contextId,
    topicDelimiter: config.TOPIC_DELIMITER,
  });
};

const getIntegrationTopicString = (
  domainEventTopic: string,
  integrationEventTopicPrefix: string,
  topicDelimiter: string,
) => {
  return `${integrationEventTopicPrefix}${topicDelimiter}${domainEventTopic}`;
};

export const getIntegrationTopic = (domainEventTopic: string) => {
  // return `${config.INTEGRATION_EVENT_TOPIC_PREFIX}${config.TOPIC_DELIMITER}${domainEventTopic}`;
  return getIntegrationTopicString(
    domainEventTopic,
    config.INTEGRATION_EVENT_TOPIC_PREFIX,
    config.TOPIC_DELIMITER,
  );
};

const getProcessManagerTopicString = (
  integrationEventTopic: string,
  processManagerEventTopicPrefix: string,
  topicDelimiter: string,
) => {
  return `${processManagerEventTopicPrefix}${topicDelimiter}${integrationEventTopic}`;
};

export const getProcessManagerTopic = (integrationEventTopic: string) => {
  return getProcessManagerTopicString(
    integrationEventTopic,
    config.PROCESS_MANAGER_EVENT_TOPIC_PREFIX,
    config.TOPIC_DELIMITER,
  );
};

export const createUUIDv4 = () => {
  return randomUUID();
};
