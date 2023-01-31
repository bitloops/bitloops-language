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
import { QueryMetadata, IQuery } from './IQuery';
import { config, TOPIC_PREFIXES } from '../../config';
import { createUUIDv4, getTopic } from '../../helpers';

const { TOPIC_DELIMITER } = config;

export abstract class Query implements IQuery {
  private static prefix: TOPIC_PREFIXES.Query = TOPIC_PREFIXES.Query;

  public readonly uuid: string;
  private createdTimestamp: number;
  public readonly metadata: QueryMetadata;
  public readonly queryTopic: string;

  constructor(queryName: string, toContextId: string, createdTimestamp?: number) {
    this.uuid = createUUIDv4();
    this.createdTimestamp = createdTimestamp || Date.now();
    this.queryTopic = Query.getQueryTopic(queryName, toContextId);
    this.metadata = {
      responseTopic: `${queryName}${TOPIC_DELIMITER}${this.uuid}`,
      toContextId,
      createdTimestamp: this.createdTimestamp,
    };
  }

  static getQueryTopic(queryName: string, toContextId: string): string {
    return getTopic(Query.prefix, queryName, toContextId);
  }
}
