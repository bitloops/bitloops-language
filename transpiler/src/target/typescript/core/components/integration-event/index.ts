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
  bitloopsPrimaryTypeKey,
  TContextData,
  TDependenciesTypeScript,
  TIntegrationEvent,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';

const INTEGRATION_EVENT_DEPENDENCIES: TDependenciesTypeScript = [
  {
    type: 'absolute',
    default: false,
    value: 'Infra',
    from: '@bitloops/bl-boilerplate-core',
  },
];

export const integrationEventToTargetLanguage = (
  integrationEventModel: TIntegrationEvent,
  contextData?: TContextData,
): TTargetDependenciesTypeScript => {
  if (!contextData) {
    throw new Error('Context data is required for domain event');
  }
  const { IntegrationEvent } = integrationEventModel;

  let result = '';
  const dependencies = INTEGRATION_EVENT_DEPENDENCIES;

  const { integrationVersionMappers, integrationEventIdentifier, parameter } = IntegrationEvent;

  const eventInputParameter = modelToTargetLanguage({
    //in create and methods
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { [bitloopsPrimaryTypeKey]: parameter[bitloopsPrimaryTypeKey] },
  });
  dependencies.push(...eventInputParameter.dependencies);
  const eventInputParameterType = eventInputParameter.output;
  const eventInputParameterValue = parameter.value;

  const integrationDataMapperTypeName = 'ToIntegrationDataMapper';
  const integrationSchemasTypeName = 'IntegrationSchemas';

  result += `type ${integrationSchemasTypeName} = ${schemas}`;
  result += `type ${integrationDataMapperTypeName} = (${eventInputParameterValue}: ${eventInputParameterType}) => ${integrationSchemasTypeName};`;
  result += `export class ${integrationEventIdentifier} extends Infra.EventBus.IntegrationEvent<${integrationSchemasTypeName}> { `;
  result += `public static readonly fromContextId = '${contextData.boundedContext}';`;
  result += `static versions = ${versions};`;
  result += `static versionMappers: Record<string, ${integrationDataMapperTypeName}> = ${versionMappers};`;
  result += generateConstructor(domainEventName, entityName);
  result += generateVersionMapperMethods(domainEventName, entityName);
  result += generateEventTopicMethod(domainEventName, entityName);
  result += `static getEventTopic() { return ${domainEventName}.eventName; }`;
  result += '}';

  const finalDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.IntegrationEvent,
    className: integrationEventIdentifier,
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

const generateEventTopicMethod = (
  domainEventIdentifier: string,
  entityIdentifier: string,
): string => {
  const res = `static getEventTopic() { return ${domainEventName}.eventName; }`;
  return res;
};
