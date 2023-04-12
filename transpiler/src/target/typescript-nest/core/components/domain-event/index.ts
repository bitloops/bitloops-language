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
  TVariable,
  fieldsKey,
} from '../../../../../types.js';
import { EOL } from 'os';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';

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

  const fields = domainEvent[fieldsKey];

  const contextId = `'${contextData.boundedContext}'`;
  const domainEventPropsIdentifier = `${domainEventName}Props`;
  const domainEventProps = getDomainEventPropsType(domainEventPropsIdentifier, fields);
  dependencies.push(...domainEventProps.dependencies);
  result += domainEventProps.output + '\n';
  result += `export class ${domainEventName} extends Domain.DomainEvent<${domainEventPropsIdentifier}> { `;
  result += getClassProperties();
  result += generateConstructor(domainEventPropsIdentifier, contextId);
  result += '}';

  const finalDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.DomainEvent,
    className: domainEventName,
  });

  return { output: result, dependencies: finalDependencies };
};

const generateConstructor = (entityIdentifier: string, contextId: string): string => {
  return (
    EOL +
    `constructor(payload: ${entityIdentifier}) {` +
    `super(${contextId}, payload);` +
    ' this.aggregateId = payload.aggregateId;' +
    '}'
  );
};

const getClassProperties = (): string => {
  const classProperties = 'public readonly aggregateId: string;' + EOL;

  return classProperties;
};

const getDomainEventPropsType = (
  propsIdentifier: string,
  variables: TVariable[] | undefined,
): TTargetDependenciesTypeScript => {
  if (variables === undefined) {
    return {
      output: `type ${propsIdentifier} = Domain.TDomainEventProps<{}>
      `,
      dependencies: [],
    };
  }
  const variablesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TVariables,
    value: variables,
  });
  const type = `type ${propsIdentifier} = Domain.TDomainEventProps<{
    ${variablesResult.output}
  }> 
   `;
  return { output: type, dependencies: variablesResult.dependencies };
};
