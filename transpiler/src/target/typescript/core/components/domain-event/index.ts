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
import {
  DomainEventIdentifierKey,
  TContextData,
  TDependenciesTypeScript,
  TDomainEvent,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getChildDependencies, getParentDependencies } from '../../dependencies.js';

const DOMAIN_EVENT_DEPENDENCIES: () => TDependenciesTypeScript = () => [
  {
    type: 'absolute',
    default: false,
    value: 'Domain',
    from: '@bitloops/bl-boilerplate-core',
  },
];

export const domainEventToTargetLanguage = (
  domainEventModel: TDomainEvent,
  contextData?: TContextData,
): TTargetDependenciesTypeScript => {
  if (!contextData) {
    throw new Error('Context data is required for domain event');
  }
  const { domainEvent } = domainEventModel;

  let result = '';
  const dependencies = DOMAIN_EVENT_DEPENDENCIES();

  const domainEventName = domainEvent[DomainEventIdentifierKey];
  const entityName = domainEvent.entityIdentifier;

  const entityDependency = getChildDependencies(entityName);
  dependencies.push(...entityDependency);

  const { topic } = domainEvent;
  const eventName = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: topic,
  });
  dependencies.push(...eventName.dependencies);
  result += `export class ${domainEventName} extends Domain.Event<${entityName}> { `;
  result += `public static readonly eventName = ${eventName.output};`;
  result += `public static readonly fromContextId = '${contextData.boundedContext}';`;
  result += generateConstructor(domainEventName, entityName);
  result += `static getEventTopic() { return ${domainEventName}.eventName; }`;
  result += '}';

  const finalDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.DomainEvent,
    className: domainEventName,
  });

  return { output: result, dependencies: finalDependencies };
};

const generateConstructor = (domainEventIdentifier: string, entityIdentifier: string): string => {
  // entity identifier will be same as Entity Class name, but with first letter in lower case and without Entity suffix
  // e.g. AccountEntity => account
  const entityIdentifierAttribute =
    entityIdentifier.charAt(0).toLowerCase() + entityIdentifier.slice(1, -6);
  return (
    `constructor(public readonly ${entityIdentifierAttribute}: ${entityIdentifier}, uuid?: string) {` +
    '   const metadata = {' +
    `   fromContextId: ${domainEventIdentifier}.fromContextId,` +
    '   id: uuid,' +
    ' };' +
    ` super(${domainEventIdentifier}.getEventTopic(), ${entityIdentifierAttribute}, metadata, ${entityIdentifierAttribute}.id);` +
    '}'
  );
};
