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
  TTargetDependenciesTypeScript,
  TValueObjectMethods,
  TValueObjects,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { constantVariables, domainPrivateMethod, generateGetters } from '../domain/index.js';
import { getParentDependencies } from '../../dependencies.js';
import { BitloopsPrimTypeIdentifiers } from './../../type-identifiers/bitloopsPrimType.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';

const VO_DEPENDENCIES: TDependenciesTypeScript = [
  {
    type: 'absolute',
    default: false,
    value: 'Domain',
    from: '@bitloops/bl-boilerplate-core',
  },
  {
    type: 'absolute',
    default: false,
    value: 'Either',
    from: '@bitloops/bl-boilerplate-core',
  },
  {
    type: 'absolute',
    default: false,
    value: 'ok',
    from: '@bitloops/bl-boilerplate-core',
  },
];

const valueObjectMethods = (
  valueObjectMethods: TValueObjectMethods,
): TTargetDependenciesTypeScript => {
  let dependencies = [];

  const result = Object.entries(valueObjectMethods).reduce((acc, [methodName, methodInfo]) => {
    acc += domainPrivateMethod(methodName, methodInfo).output;
    dependencies = [...dependencies, ...domainPrivateMethod(methodName, methodInfo).dependencies];
    return acc;
  }, '');

  return { output: result, dependencies };
};

const valueObjectsToTargetLanguage = (params: {
  valueObjects: TValueObjects;
  model: IntermediateASTTree;
  contextData: TContextData;
}): TTargetDependenciesTypeScript => {
  const { valueObjects, model, contextData } = params;

  const { boundedContext, module } = contextData;

  const modelForContext = model[boundedContext][module];

  const initialObjectValuesLangMapping = (voName: string, propsName: string): string =>
    `export class ${voName} extends Domain.ValueObject<${propsName}> { `;

  let result = '';
  let parentDependencies;
  let dependencies: TDependenciesTypeScript = VO_DEPENDENCIES;

  for (const [valueObjectName, valueObject] of Object.entries(valueObjects)) {
    const { methods, create, constantVars } = valueObject;
    const propsNameType = create.parameterDependency.parameter.type;
    if (BitloopsPrimTypeIdentifiers.isArrayPrimType(propsNameType)) {
      throw new Error(
        `Value Object ${valueObjectName} has an array as a property. This is not supported yet.`,
      );
    }
    const { output: propsName, dependencies: propsTypeDependencies } = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: propsNameType,
    });
    dependencies = [...dependencies, ...propsTypeDependencies];

    if (constantVars) {
      // TODO FIx with new type
      result += constantVariables(constantVars as any).output;
      dependencies = [...dependencies, ...constantVariables(constantVars as any).dependencies];
    }

    result += initialObjectValuesLangMapping(valueObjectName, propsName);
    // Add this.props to constructor when overriding from bl

    const voCreateModel = modelToTargetLanguage({
      type: BitloopsTypesMapping.TDomainCreateMethod,
      value: create,
    });
    result += voCreateModel.output;
    dependencies = [...dependencies, ...voCreateModel.dependencies];

    const IS_VALUE_OBJECT = true;
    const gettersModel = generateGetters(propsName, modelForContext, methods, IS_VALUE_OBJECT);
    result += gettersModel.output;
    dependencies = [...dependencies, ...gettersModel.dependencies];

    if (methods) {
      const voMethodsModel = valueObjectMethods(methods);
      result += voMethodsModel.output;
      dependencies = [...dependencies, ...voMethodsModel.dependencies];
    }

    const finalObjValLangMapping = '}';
    result += finalObjValLangMapping;

    parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
      classType: ClassTypes.ValueObjects,
      className: valueObjectName,
    });
  }

  return { output: result, dependencies: parentDependencies };
};

export { valueObjectsToTargetLanguage };
