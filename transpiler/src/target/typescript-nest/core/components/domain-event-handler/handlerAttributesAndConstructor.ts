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
  busDependencies: TEventHandlerBusDependencies;
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
  _contextData?: TContextData,
): TTargetDependenciesTypeScript => {
  const { parameterList, busDependencies } = value;
  const dependencies: TDependenciesTypeScript = [];
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
  const busesConstructorTarget = getDefaultBusConstructorStatements(busDependencies);

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
  busDependencies: TEventHandlerBusDependencies,
): busDependencies is TEventHandlerBusDependencies => {
  return 'eventHandlerBusDependencies' in busDependencies;
};

const getDefaultBusAttributes = (
  busDependencies: TEventHandlerBusDependencies,
): TTargetDependenciesTypeScript => {
  if (isEventHandlerBusDependencies(busDependencies)) {
    const { commandBus, queryBus, integrationEventBus } =
      busDependencies.eventHandlerBusDependencies;
    let res = '';
    if (commandBus) res += 'private commandBus: Infra.CommandBus.ICommandBus;';
    if (queryBus) res += 'private queryBus: Infra.QueryBus.IQueryBus;';
    if (integrationEventBus) res += 'private integrationEventBus: Infra.EventBus.IEventBus;';
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
  busDependencies: TEventHandlerBusDependencies,
): TTargetDependenciesTypeScript => {
  if (isEventHandlerBusDependencies(busDependencies)) {
    const { commandBus, queryBus, integrationEventBus } =
      busDependencies.eventHandlerBusDependencies;
    let res = '';
    if (commandBus) res += 'this.commandBus = Container.getCommandBus();';
    if (queryBus) res += 'this.queryBus = Container.getQueryBus();';
    if (integrationEventBus)
      res += 'this.integrationEventBus = Container.getIntegrationEventBus();';
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
