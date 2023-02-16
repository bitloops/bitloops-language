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
  TContextData,
  TEventHandlerBusDependencies,
  TParameterList,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

type Input = {
  parameterList: TParameterList;
  busDependencies: TEventHandlerBusDependencies;
};

export const generateHandlerAttributesAndConstructor = (
  value: Input,
  contextData?: TContextData,
): TTargetDependenciesTypeScript => {
  const { parameterList, busDependencies } = value;
  if (!contextData) {
    throw new Error('Context data is required for generateHandlerAttributesAndConstructor');
  }
  const boundedContextId = contextData.boundedContext;
  const parametersRes = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: parameterList,
  });
  let res = getDefaultBusAttributes(busDependencies);
  // Prepend private accessor before each parameter, keep parenthesis and split by comma
  const parameters =
    parameterList.parameters.length === 0
      ? ''
      : parametersRes.output
          .replace('(', '')
          .replace(')', '')
          .split(',')
          .map((param) => `private ${param}`)
          .join(', ')
          .trim();

  res += `constructor(${parameters}) { ${getDefaultBusConstructorStatements(
    busDependencies,
    boundedContextId,
  )} }`;

  return {
    output: res,
    dependencies: parametersRes.dependencies,
  };
};

const getDefaultBusAttributes = (busDependencies: TEventHandlerBusDependencies): string => {
  const { commandBus, queryBus, integrationEventBus } = busDependencies.eventHandlerBusDependencies;
  let res = '';
  if (commandBus) res += 'private commandBus: Infra.CommandBus.ICommandBus;';
  if (queryBus) res += 'private queryBus: Infra.QueryBus.IQueryBus;';
  if (integrationEventBus)
    res += 'private integrationEventBus: Infra.IntegrationEventBus.IIntegrationEventBus;';
  return res;
};

const getDefaultBusConstructorStatements = (
  busDependencies: TEventHandlerBusDependencies,
  boundedContextId,
): string => {
  const { commandBus, queryBus, integrationEventBus } = busDependencies.eventHandlerBusDependencies;
  let res = '';
  if (commandBus)
    res += `this.commandBus = Container.getCommandBusFromContext('${boundedContextId}');`;
  if (queryBus) res += `this.queryBus = Container.getQueryBusFromContext('${boundedContextId}');`;
  if (integrationEventBus)
    res += `this.integrationEventBus = Container.getIntegrationEventBusFromContext('${boundedContextId}');`;
  return res;
};
