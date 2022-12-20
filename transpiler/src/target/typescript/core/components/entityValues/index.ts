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
  TDomainPrivateMethods,
  TDomainPublicMethods,
  TEntityValues,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { domainMethods } from '../domain/domainMethods.js';
import { constantVariables, generateGetters } from '../domain/index.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsPrimTypeIdentifiers } from './../../type-identifiers/bitloopsPrimType.js';

const entityMethods = (
  privateMethods: TDomainPrivateMethods,
  publicMethods: TDomainPublicMethods,
): TTargetDependenciesTypeScript => {
  const result = domainMethods(publicMethods, privateMethods);

  return { output: result.output, dependencies: result.dependencies };
};

const entityValuesToTargetLanguage = (params: {
  entityValues: TEntityValues;
  model: IntermediateASTTree;
  contextData: TContextData;
}): TTargetDependenciesTypeScript => {
  const { entityValues, model, contextData } = params;

  const { boundedContext, module } = contextData;

  const modelForContext = model[boundedContext][module];

  let result = '{';
  let dependencies = [];
  const { privateMethods, publicMethods, create, constants } = entityValues;
  const propsNameType = create.parameter.type;
  if (BitloopsPrimTypeIdentifiers.isArrayPrimType(propsNameType)) {
    throw new Error('Array is not supported as entity props type');
  }
  const { output: propsName, dependencies: entityPropsTypeDependencies } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: propsNameType,
  });
  dependencies = [...dependencies, ...entityPropsTypeDependencies];

  if (constants) {
    // TODO fix with new model/types
    const constantVariablesModel = constantVariables(constants as any);
    result += constantVariablesModel.output;
    dependencies = [...dependencies, ...constantVariablesModel.dependencies];
  }

  const entityCreateModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TEntityCreate,
    value: create,
  });
  result += entityCreateModel.output;
  dependencies = [...dependencies, ...entityCreateModel.dependencies];

  const gettersModel = generateGetters({
    propsName,
    model: modelForContext,
    privateMethods,
    publicMethods,
  });
  result += gettersModel.output;
  dependencies = [...dependencies, ...gettersModel.dependencies];

  const entityMethodsModel = entityMethods(privateMethods, publicMethods);
  result += entityMethodsModel.output;
  dependencies = [...dependencies, ...entityMethodsModel.dependencies];

  result += '}';

  return { output: result, dependencies };
};

export { entityValuesToTargetLanguage };
