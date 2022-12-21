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
  TDependencyChildTypescript,
  TDomainPrivateMethods,
  TDomainPublicMethods,
  TEntity,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { domainMethods } from '../domain/domainMethods.js';
import { constantVariables, generateGetters } from '../domain/index.js';
import { getParentDependencies } from '../../dependencies.js';
import { BitloopsPrimTypeIdentifiers } from '../../type-identifiers/bitloopsPrimType.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';

const ENTITY_DEPENDENCIES: TDependenciesTypeScript = [
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

const entityMethods = (
  privateMethods: TDomainPrivateMethods,
  publicMethods: TDomainPublicMethods,
): TTargetDependenciesTypeScript => {
  const result = domainMethods(publicMethods, privateMethods);

  return { output: result.output, dependencies: result.dependencies };
};

const initialEntityLangMapping = (entityName: string, propsName: string): string =>
  `export class ${entityName} extends Domain.Entity<${propsName}> { `;

const entityToTargetLanguage = (params: {
  entity: TEntity;
  model: IntermediateASTTree;
}): TTargetDependenciesTypeScript => {
  const { entity, model } = params;

  let result = '';
  let dependencies = ENTITY_DEPENDENCIES;

  const { entityValues, entityIdentifier } = entity.Entity;
  const { privateMethods, publicMethods, create, constants } = entityValues;

  const propsNameType = create.parameter.type;
  if (BitloopsPrimTypeIdentifiers.isArrayPrimType(propsNameType)) {
    throw new Error(`Entity props type of ${entityIdentifier} cannot be an array`);
  }
  const { output: propsName, dependencies: propsTypeDependencies } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { type: propsNameType },
  });

  dependencies = [...dependencies, ...propsTypeDependencies];

  if (constants) {
    // TODO fix with new model/types
    const constantVariablesModel = constantVariables(constants as any);
    result += constantVariablesModel.output;
    dependencies = [...dependencies, ...constantVariablesModel.dependencies];
  }

  result += initialEntityLangMapping(entityIdentifier, propsName);

  const entityCreateModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TEntityCreate,
    value: { create },
  });
  result += entityCreateModel.output;
  dependencies = [...dependencies, ...entityCreateModel.dependencies];

  const gettersModel = generateGetters({
    propsName,
    model,
    publicMethods,
    privateMethods,
  });
  result += gettersModel.output;
  dependencies = [...dependencies, ...gettersModel.dependencies];

  const entityMethodsModel = entityMethods(privateMethods, publicMethods);
  result += entityMethodsModel.output;
  dependencies = [...dependencies, ...entityMethodsModel.dependencies];

  result += '}';

  const parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
    classType: ClassTypes.Entity,
    className: entityIdentifier,
  });

  return { output: result, dependencies: parentDependencies };
};

export { entityToTargetLanguage };
