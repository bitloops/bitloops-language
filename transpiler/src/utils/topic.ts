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
export class TopicUtils {
  static generateDefaultDomainEventTopicName(
    domainEventIdentifier: string,
    contextInfo: { boundedContextName: string; moduleName: string },
  ): string {
    return TopicUtils.generateDefaultTopicName(domainEventIdentifier, contextInfo, 'DOMAIN_EVENT');
  }

  /**
   *
   * @param replaceString Identifier's suffix to be replaced, in uppercase and with underscores
   * @returns
   */
  static generateDefaultTopicName(
    identifier: string,
    contextInfo: { boundedContextName: string; moduleName: string },
    replaceString: string,
  ): string {
    const { boundedContextName, moduleName } = contextInfo;
    const replaceRegex = new RegExp(`_${replaceString}$`);

    const topicName = identifier
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
      .toUpperCase()
      .replace(replaceRegex, '');
    const fullTopicName = `${boundedContextName}.${moduleName}.${replaceString}.${topicName}`;
    return fullTopicName;
  }
}
