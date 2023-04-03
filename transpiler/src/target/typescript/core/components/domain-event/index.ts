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
  MetadataTypeNames,
  TContextData,
  TDependenciesTypeScript,
  TDomainEvent,
  TMetadata,
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
  {
    type: 'absolute',
    default: false,
    value: 'asyncLocalStorage',
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

  const contextId = `'${contextData.boundedContext}'`;

  result += `export class ${domainEventName} implements Domain.IDomainEvent<${entityName}> { `;
  result += getClassProperties(contextId);
  result += generateConstructor(entityName);
  result += '}';

  const finalDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.DomainEvent,
    className: domainEventName,
  });

  return { output: result, dependencies: finalDependencies };
};

const generateConstructor = (entityIdentifier: string): string => {
  return (
    `constructor(public readonly data: ${entityIdentifier}) {` +
    ' this.aggregateId = data.id.toString();' +
    '}'
  );
};

const getClassProperties = (contextId: string): string => {
  let classProperties = 'public aggregateId: string;';

  const metadata: TMetadata = {
    contextId,
    metadataType: MetadataTypeNames.DomainEvent,
  };
  const metadataProperty = modelToTargetLanguage({
    type: BitloopsTypesMapping.TMetadata,
    value: metadata,
  });
  classProperties += metadataProperty.output;
  return classProperties;
};
