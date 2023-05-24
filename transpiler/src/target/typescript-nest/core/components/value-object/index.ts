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
  TPrivateMethods,
  TTargetDependenciesTypeScript,
  TValueObject,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { constantVariables, generateGetters } from '../domain/index.js';
import { getParentDependencies } from '../../dependencies.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { domainPrivateMethods } from '../domain/domainMethods.js';
import { getValueObjectPrimitivesObject } from './from-to-primitives/primitives-object.js';
import {
  ValueObjectPrimitivesTypeFactory,
  getPrimitivesType,
} from './from-to-primitives/primitives-type.js';
import { generateFromPrimitives } from './from-to-primitives/from-primitives.js';
import { generateToPrimitives } from './from-to-primitives/to-primitives.js';

const VO_DEPENDENCIES: () => TDependenciesTypeScript = () => [
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

const valueObjectMethods = (valueObjectMethods: TPrivateMethods): TTargetDependenciesTypeScript => {
  const { output, dependencies } = domainPrivateMethods(valueObjectMethods);

  return { output, dependencies };
};

const valueObjectsToTargetLanguage = (params: {
  valueObject: TValueObject;
  model: IntermediateASTTree;
}): TTargetDependenciesTypeScript => {
  const { valueObject, model } = params;

  let result = '';
  let dependencies: TDependenciesTypeScript = VO_DEPENDENCIES();

  const { privateMethods, create, constants, valueObjectIdentifier } = valueObject.ValueObject;
  const domainCreateProps = create.parameter.type;

  const primitivesObject = getValueObjectPrimitivesObject(model, valueObjectIdentifier);

  const primitivesType = getPrimitivesType(primitivesObject, valueObjectIdentifier);
  result += primitivesType + '\n';
  const toBeImportedPrimitiveTypes =
    ValueObjectPrimitivesTypeFactory.getPrimitiveTypesThatNeedToBeImported(primitivesObject);

  const { output: propsName, dependencies: propsTypeDependencies } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { type: domainCreateProps },
  });
  dependencies = [...dependencies, ...propsTypeDependencies, ...toBeImportedPrimitiveTypes];

  if (constants) {
    const constantsRes = constantVariables(constants);
    result += constantsRes.output;
    dependencies = [...dependencies, ...constantsRes.dependencies];
  }

  result += `export class ${valueObjectIdentifier} extends Domain.ValueObject<${propsName}> { `;
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

  const fromPrimitives = generateFromPrimitives(primitivesObject, valueObjectIdentifier);
  result += fromPrimitives + '\n';

  const toPrimitives = generateToPrimitives(primitivesObject, valueObjectIdentifier);
  result += toPrimitives + '\n';

  result += '}';

  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.ValueObject,
    className: valueObjectIdentifier,
  });

  return { output: result, dependencies: parentDependencies };
};

export { valueObjectsToTargetLanguage };
