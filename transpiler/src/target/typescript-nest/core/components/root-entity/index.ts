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
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import {
  RootEntityKey,
  TDependenciesTypeScript,
  TRootEntity,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from './../../dependencies.js';
import { constantVariables, generateGetters } from '../domain/index.js';
import { domainMethods } from '../domain/domainMethods.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { getEntityPrimitivesObject } from '../entity-values/index.js';
import {
  generateFromPrimitives,
  generateToPrimitives,
  getPrimitivesType,
} from '../entity-values/fromToPrimitives.js';

const ROOT_ENTITY_DEPENDENCIES: () => TDependenciesTypeScript = () => [
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

//TODO check extends
const rootEntityClassHeader = (rootEntityName: string, propsName: string): string =>
  `export class ${rootEntityName} extends Domain.Aggregate<${propsName}> { `;

export const rootEntityToTargetLanguage = (params: {
  rootEntity: TRootEntity;
  model: IntermediateASTTree;
}): TTargetDependenciesTypeScript => {
  const { rootEntity, model } = params;

  const rootEntityName = rootEntity[RootEntityKey].entityIdentifier;

  let output = '';
  let dependencies = ROOT_ENTITY_DEPENDENCIES();

  const { create, privateMethods, publicMethods, constants } =
    rootEntity[RootEntityKey].entityValues;

  const propsNameType = create.parameter.type;
  const primitivesObject = getEntityPrimitivesObject(model, rootEntityName);

  const primitivesType = getPrimitivesType(primitivesObject, rootEntityName);
  output += primitivesType + '\n';

  const { output: propsName, dependencies: rootEntityPropsTypeDependencies } =
    modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: propsNameType },
    });

  dependencies.push(...rootEntityPropsTypeDependencies);

  if (constants) {
    const constantVariablesModel = constantVariables(constants);
    output += constantVariablesModel.output;
    dependencies.push(...constantVariablesModel.dependencies);
  }

  output += rootEntityClassHeader(rootEntityName, propsName);

  const aggregateCreateModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TEntityCreate,
    value: { create },
  });
  output += aggregateCreateModel.output;
  dependencies.push(...aggregateCreateModel.dependencies);

  const gettersModel = generateGetters({
    propsName,
    model,
    privateMethods,
    publicMethods,
  });
  output += gettersModel.output;
  dependencies.push(...gettersModel.dependencies);

  const entityMethodsModel = domainMethods(publicMethods, privateMethods);
  output += entityMethodsModel.output;
  dependencies.push(...entityMethodsModel.dependencies);

  const fromPrimitives = generateFromPrimitives(primitivesObject, rootEntityName, model);
  output += fromPrimitives + '\n';

  const toPrimitives = generateToPrimitives(primitivesObject, rootEntityName, model);
  output += toPrimitives + '\n';

  output += '}';

  dependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.RootEntity,
    className: rootEntityName,
  });

  return { output, dependencies };
};
