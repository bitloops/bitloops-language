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
  TControllerBusDependencies,
  TDependenciesTypeScript,
  TDependencyChildTypescript,
  TEventHandlerBusDependencies,
  TParameterList,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export type ConstructorWithEventBusesInput = {
  parameterList: TParameterList;
  busDependencies: TEventHandlerBusDependencies | TControllerBusDependencies;
  needsSuper?: boolean;
};

const INFRA_DEPENDENCY: TDependencyChildTypescript = {
  type: 'absolute',
  default: false,
  value: 'Infra',
  from: '@bitloops/bl-boilerplate-core',
};

const CONTAINER_DEPENDENCY: TDependencyChildTypescript = {
  type: 'absolute',
  default: false,
  value: 'Container',
  from: '@bitloops/bl-boilerplate-core',
};

export const generateHandlerAttributesAndConstructor = (
  value: ConstructorWithEventBusesInput,
  contextData?: TContextData,
): TTargetDependenciesTypeScript => {
  const { parameterList, busDependencies } = value;
  const dependencies: TDependenciesTypeScript = [];
  if (!contextData) {
    throw new Error('Context data is required for generateHandlerAttributesAndConstructor');
  }
  const boundedContextId = contextData.boundedContext;
  const parametersRes = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: parameterList,
  });
  const attributesTarget = getDefaultBusAttributes(busDependencies);
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

  dependencies.push(...parametersRes.dependencies);
  const superCall = 'super();';
  const busesConstructorTarget = getDefaultBusConstructorStatements(
    busDependencies,
    boundedContextId,
  );

  const res =
    attributesTarget.output +
    `constructor(${parameters}) { ${value.needsSuper ? superCall : ''} ${
      busesConstructorTarget.output
    } }`;

  dependencies.push(...attributesTarget.dependencies, ...busesConstructorTarget.dependencies);
  return {
    output: res,
    dependencies,
  };
};

const isEventHandlerBusDependencies = (
  busDependencies: TEventHandlerBusDependencies | TControllerBusDependencies,
): busDependencies is TEventHandlerBusDependencies => {
  return 'eventHandlerBusDependencies' in busDependencies;
};

const isControllerBusDependencies = (
  busDependencies: TEventHandlerBusDependencies | TControllerBusDependencies,
): busDependencies is TControllerBusDependencies => {
  return 'controllerBusDependencies' in busDependencies;
};

const getDefaultBusAttributes = (
  busDependencies: TEventHandlerBusDependencies | TControllerBusDependencies,
): TTargetDependenciesTypeScript => {
  if (isEventHandlerBusDependencies(busDependencies)) {
    const { commandBus, queryBus, integrationEventBus } =
      busDependencies.eventHandlerBusDependencies;
    let res = '';
    if (commandBus) res += 'private commandBus: Infra.CommandBus.ICommandBus;';
    if (queryBus) res += 'private queryBus: Infra.QueryBus.IQueryBus;';
    if (integrationEventBus)
      res += 'private integrationEventBus: Infra.IntegrationEventBus.IIntegrationEventBus;';
    if (res !== '') {
      return { output: res, dependencies: [INFRA_DEPENDENCY] };
    }
    return {
      output: res,
      dependencies: [],
    };
  }
  if (isControllerBusDependencies(busDependencies)) {
    const { commandBus, queryBus } = busDependencies.controllerBusDependencies;
    let res = '';
    if (commandBus) res += 'private commandBus: Infra.CommandBus.ICommandBus;';
    if (queryBus) res += 'private queryBus: Infra.QueryBus.IQueryBus;';
    if (res !== '') {
      return { output: res, dependencies: [INFRA_DEPENDENCY] };
    }
    return {
      output: res,
      dependencies: [],
    };
  }
  throw new Error('Invalid bus dependencies');
};

const getDefaultBusConstructorStatements = (
  busDependencies: TEventHandlerBusDependencies | TControllerBusDependencies,
  boundedContextId,
): TTargetDependenciesTypeScript => {
  if (isEventHandlerBusDependencies(busDependencies)) {
    const { commandBus, queryBus, integrationEventBus } =
      busDependencies.eventHandlerBusDependencies;
    let res = '';
    if (commandBus)
      res += `this.commandBus = Container.getCommandBusFromContext('${boundedContextId}');`;
    if (queryBus) res += `this.queryBus = Container.getQueryBusFromContext('${boundedContextId}');`;
    if (integrationEventBus)
      res += `this.integrationEventBus = Container.getIntegrationEventBusFromContext('${boundedContextId}');`;
    if (res !== '') {
      return { output: res, dependencies: [CONTAINER_DEPENDENCY] };
    }
    return {
      output: res,
      dependencies: [],
    };
  } else if (isControllerBusDependencies(busDependencies)) {
    const { commandBus, queryBus } = busDependencies.controllerBusDependencies;
    let res = '';
    if (commandBus)
      res += `this.commandBus = Container.getCommandBusFromContext('${boundedContextId}');`;
    if (queryBus) res += `this.queryBus = Container.getQueryBusFromContext('${boundedContextId}');`;
    if (res !== '') {
      return { output: res, dependencies: [CONTAINER_DEPENDENCY] };
    }
    return {
      output: res,
      dependencies: [],
    };
  }
  throw new Error('Invalid bus dependencies');
};
