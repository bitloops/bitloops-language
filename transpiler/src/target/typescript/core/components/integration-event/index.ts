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
  MetadataTypeNames,
  TContextData,
  TDependenciesTypeScript,
  TIntegrationEvent,
  TIntegrationVersionMapper,
  TMetadata,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getChildDependencies, getParentDependencies } from '../../dependencies.js';
import { StringUtils } from '../../../../../utils/index.js';

const INTEGRATION_EVENT_DEPENDENCIES: () => TDependenciesTypeScript = () => [
  {
    type: 'absolute',
    default: false,
    value: 'Infra',
    from: '@bitloops/bl-boilerplate-core',
  },
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
  {
    type: 'absolute',
    default: false,
    value: 'Traceable',
    from: '@bitloops/bl-boilerplate-infra-telemetry',
  },
];
const INTEGRATION_EVENT_CONSTANTS = {
  integrationSchemasTypeName: 'TIntegrationSchemas',
  integrationDataMapperTypeName: 'ToIntegrationDataMapper',
  versionMappersFieldName: 'versionMappers',
  versionsFieldName: 'versions',
  boundedContextIdFieldName: 'boundedContextId',
};

export const integrationEventToTargetLanguage = (
  integrationEventModel: TIntegrationEvent,
  contextData?: TContextData,
): TTargetDependenciesTypeScript => {
  if (!contextData) {
    throw new Error('Context data is required for integration event');
  }
  const { IntegrationEvent } = integrationEventModel;

  let result = '';
  const dependencies = INTEGRATION_EVENT_DEPENDENCIES();

  const { integrationVersionMappers, integrationEventIdentifier, parameter } = IntegrationEvent;

  const eventInputParameter = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { [bitloopsPrimaryTypeKey]: parameter[bitloopsPrimaryTypeKey] },
  });
  dependencies.push(...eventInputParameter.dependencies);
  const eventInputParameterType = eventInputParameter.output;
  const eventInputParameterValue = parameter.value;

  const versionMapperMethods = generateVersionMapperMethods(
    integrationVersionMappers,
    eventInputParameterValue,
    eventInputParameterType,
  );
  dependencies.push(...versionMapperMethods.dependencies);

  const { versions, versionMappers, integrationSchemas } = getVersionMappersInfo(
    integrationVersionMappers,
    integrationEventIdentifier,
  );

  result += `type ${INTEGRATION_EVENT_CONSTANTS.integrationSchemasTypeName} = ${integrationSchemas};`;
  result += `type ${INTEGRATION_EVENT_CONSTANTS.integrationDataMapperTypeName} = (${eventInputParameterValue}: ${eventInputParameterType}) => ${INTEGRATION_EVENT_CONSTANTS.integrationSchemasTypeName};`;
  result += `export class ${integrationEventIdentifier} implements Infra.EventBus.IntegrationEvent<${INTEGRATION_EVENT_CONSTANTS.integrationSchemasTypeName}> { `;
  result += `public static readonly ${INTEGRATION_EVENT_CONSTANTS.boundedContextIdFieldName} = '${contextData.boundedContext}';`;
  result += `static ${INTEGRATION_EVENT_CONSTANTS.versionsFieldName} = ${versions};`;
  result += `static ${INTEGRATION_EVENT_CONSTANTS.versionMappersFieldName}: Record<string, ${INTEGRATION_EVENT_CONSTANTS.integrationDataMapperTypeName}> = ${versionMappers};`;
  result += `public metadata: ${MetadataTypeNames.IntegrationEvent};`;
  result += generateConstructor(integrationEventIdentifier);
  result += generateCreate(eventInputParameterType, integrationEventIdentifier);
  result += versionMapperMethods.output;
  result += '}';

  const finalDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.IntegrationEvent,
    className: integrationEventIdentifier,
  });

  return { output: result, dependencies: finalDependencies };
};

const generateConstructor = (integrationEventIdentifier: string): string => {
  const contextId = `${integrationEventIdentifier}.${INTEGRATION_EVENT_CONSTANTS.boundedContextIdFieldName}`;
  const metadata: TMetadata = {
    contextId,
    metadataType: MetadataTypeNames.IntegrationEvent,
  };
  const metadataProperty = modelToTargetLanguage({
    type: BitloopsTypesMapping.TMetadata,
    value: metadata,
  });
  return (
    `constructor(public data: ${INTEGRATION_EVENT_CONSTANTS.integrationSchemasTypeName}, version: string) {` +
    metadataProperty.output +
    '}'
  );
};

const generateCreate = (
  eventInputParameterType: string,
  integrationEventIdentifier: string,
): string => {
  return (
    `static create(event: ${eventInputParameterType}): ${integrationEventIdentifier}[] {` +
    `   return ${integrationEventIdentifier}.${INTEGRATION_EVENT_CONSTANTS.versionsFieldName}.map((version) => {` +
    `       const mapper = ${integrationEventIdentifier}.${INTEGRATION_EVENT_CONSTANTS.versionMappersFieldName}[version];` +
    '       const data = mapper(event);' +
    `       return new ${integrationEventIdentifier}(data, version)` +
    '   });' +
    '}'
  );
};

const generateVersionMapperMethods = (
  integrationVersionMappers: TIntegrationVersionMapper[],
  eventInputParameterValue: string,
  eventInputParameterType: string,
): TTargetDependenciesTypeScript => {
  let versionMappers = '';
  const dependencies: TDependenciesTypeScript = [];

  for (const versionMapper of integrationVersionMappers) {
    const { integrationVersionMapper } = versionMapper;
    const { stringLiteral, StructIdentifier, statements } = integrationVersionMapper;

    const versionMapperStatements = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: statements,
    });
    dependencies.push(...versionMapperStatements.dependencies);

    const structDependency = getChildDependencies(StructIdentifier);
    dependencies.push(...structDependency);

    versionMappers += `static ${getVersionMapperMethodName(
      stringLiteral,
    )}(${eventInputParameterValue}: ${eventInputParameterType}): ${StructIdentifier} {`;
    versionMappers += versionMapperStatements.output;
    versionMappers += '}';
  }
  return { output: versionMappers, dependencies };
};

const getVersionMappersInfo = (
  integrationVersionMappers: TIntegrationVersionMapper[],
  integrationEventIdentifier: string,
): { versions: string; versionMappers: string; integrationSchemas: string } => {
  let versions = '[';
  let versionMappers = '{';
  let schemas = '';
  for (const versionMapper of integrationVersionMappers) {
    const { integrationVersionMapper } = versionMapper;
    const { stringLiteral, StructIdentifier } = integrationVersionMapper;
    const stringLiteralToTarget = modelToTargetLanguage({
      type: BitloopsTypesMapping.TLiteral,
      value: { literal: { stringLiteral } },
    });
    versions += `${stringLiteralToTarget.output},`;
    schemas += `${StructIdentifier} |`;
    versionMappers += `${
      stringLiteralToTarget.output
    }: ${integrationEventIdentifier}.${getVersionMapperMethodName(stringLiteral)},`;
  }
  versions += ']';
  versionMappers += '}';
  const integrationSchemas = StringUtils.removeLastCharactersOfString(schemas, 1);
  return {
    versions,
    versionMappers,
    integrationSchemas,
  };
};

const getVersionMapperMethodName = (versionName: string): string => {
  const versionNameWithoutDots = versionName.replaceAll('.', '');
  return `toIntegrationData${versionNameWithoutDots}`;
};
