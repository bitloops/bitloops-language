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
  TDependenciesTypeScript,
  TDomainPrivateMethods,
  TTargetDependenciesTypeScript,
  TValueObject,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { constantVariables, generateGetters } from '../domain/index.js';
import { getParentDependencies } from '../../dependencies.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { domainPrivateMethods } from '../domain/domainMethods.js';

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
  valueObjectMethods: TDomainPrivateMethods,
): TTargetDependenciesTypeScript => {
  const { output, dependencies } = domainPrivateMethods(valueObjectMethods);

  return { output, dependencies };
};

const valueObjectsToTargetLanguage = (params: {
  valueObject: TValueObject;
  model: IntermediateASTTree;
}): TTargetDependenciesTypeScript => {
  const { valueObject, model } = params;

  const initialObjectValuesLangMapping = (voName: string, propsName: string): string =>
    `export class ${voName} extends Domain.ValueObject<${propsName}> { `;

  let result = '';
  let dependencies: TDependenciesTypeScript = VO_DEPENDENCIES;

  const { privateMethods, create, constants, valueObjectIdentifier } = valueObject.ValueObject;
  const domainCreateProps = create.domainCreateParameter.parameterType;
  //TODO uncomment?
  // if (BitloopsPrimTypeIdentifiers.isArrayPrimType(propsNameType)) {
  //   throw new Error(
  //     `Value Object ${valueObjectIdentifier} has an array as a property. This is not supported yet.`,
  //   );
  // }
  const { output: propsName, dependencies: propsTypeDependencies } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TDomainConstructorParameter,
    value: domainCreateProps,
  });
  dependencies = [...dependencies, ...propsTypeDependencies];

  if (constants) {
    const constantsRes = constantVariables(constants);
    result += constantsRes.output;
    dependencies = [...dependencies, ...constantsRes.dependencies];
  }

  result += initialObjectValuesLangMapping(valueObjectIdentifier, propsName);
  // Add this.props to constructor when overriding from bl

  const voCreateModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TDomainCreateMethod,
    value: { create },
  });
  result += voCreateModel.output;
  dependencies = [...dependencies, ...voCreateModel.dependencies];

  const IS_VALUE_OBJECT = true;
  const gettersModel = generateGetters({
    propsName,
    model,
    privateMethods,
    isValueObject: IS_VALUE_OBJECT,
  });
  result += gettersModel.output;
  dependencies = [...dependencies, ...gettersModel.dependencies];

  if (privateMethods) {
    const voMethodsModel = valueObjectMethods(privateMethods);
    result += voMethodsModel.output;
    dependencies = [...dependencies, ...voMethodsModel.dependencies];
  }

  result += '}';

  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.ValueObject,
    className: valueObjectIdentifier,
  });

  return { output: result, dependencies: parentDependencies };
};

export { valueObjectsToTargetLanguage };
