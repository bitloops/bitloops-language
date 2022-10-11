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
type GetTopicTypeParams = {
  topicPrefix: string;
  name: string;
  contextId: string;
  topicDelimiter: string;
};

export const getTopic = ({ topicPrefix, name, contextId, topicDelimiter }: GetTopicTypeParams) => {
  return `${topicPrefix}${topicDelimiter}${contextId}${topicDelimiter}${name}`;
};

export const getIntegrationTopic = (
  domainEventTopic: string,
  integrationEventTopicPrefix: string,
  topicDelimiter: string,
) => {
  return `${integrationEventTopicPrefix}${topicDelimiter}${domainEventTopic}`;
};

export const getProcessManagerTopic = (
  integrationEventTopic: string,
  processManagerEventTopicPrefix: string,
  topicDelimiter: string,
) => {
  return `${processManagerEventTopicPrefix}${topicDelimiter}${integrationEventTopic}`;
};
