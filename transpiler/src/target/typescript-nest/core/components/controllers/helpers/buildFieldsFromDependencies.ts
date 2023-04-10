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
  TControllerBusDependencies,
  TParameterList,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';
import { ConstructorWithEventBusesInput } from '../../domain-event-handler/handlerAttributesAndConstructor.js';

const constructorToTarget = (paramsString: string, params: TParameterList): string => {
  const constructorParamsBody = params.parameters
    .map((parameterDependency) => {
      const { value } = parameterDependency.parameter;
      return `this.${value} = ${value};`;
    })
    .join(' ');
  return `constructor${paramsString} { super(); ${constructorParamsBody} }`;
};

const busDependenciesAreDefined = (
  busDependencies: Partial<TControllerBusDependencies>,
): busDependencies is TControllerBusDependencies => {
  return busDependencies.controllerBusDependencies !== undefined;
};

export const buildFieldsFromDependencies = (
  params: TParameterList,
  contextData: { boundedContext: string; module: string },
  busDependenciesModel: Partial<TControllerBusDependencies>,
): TTargetDependenciesTypeScript => {
  if (busDependenciesAreDefined(busDependenciesModel)) {
    const value: ConstructorWithEventBusesInput = {
      parameterList: params,
      busDependencies: busDependenciesModel,
      needsSuper: true,
    };
    const constructor = modelToTargetLanguage({
      value,
      type: BitloopsTypesMapping.THandlerAttributesAndConstructor,
      contextData,
    });
    return constructor;
  }

  let result = params.parameters
    .map((parameterDependency) => {
      const { type, value } = parameterDependency.parameter;
      const mappedType = modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: { type },
      });
      return `private ${value}: ${mappedType.output};`;
    })
    .join(' ');

  const parametersModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: params,
    contextData,
  });
  result += constructorToTarget(parametersModel.output, params);

  return { output: result, dependencies: parametersModel.dependencies };
};
