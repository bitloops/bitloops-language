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
  TEntity,
  TEntityMethods,
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

const entityMethods = (objectValueMethods: TEntityMethods): TTargetDependenciesTypeScript => {
  const result = domainMethods(objectValueMethods);
  return { output: result.output, dependencies: result.dependencies };
};

const entityToTargetLanguage = (params: {
  entity: TEntity;
  model: IntermediateASTTree;
  contextData: TContextData;
}): TTargetDependenciesTypeScript => {
  const { entity, model, contextData } = params;

  const { boundedContext, module } = contextData;

  const modelForContext = model[boundedContext][module];

  const initialEntityLangMapping = (entityName: string, propsName: string) =>
    `export class ${entityName} extends Domain.Entity<${propsName}> { `;

  let result = '';
  let dependencies = ENTITY_DEPENDENCIES;

  const { entityValues, entityIdentifier } = entity.Entity;
  const { methods, create, constantVars } = entityValues;
  const propsNameType = create.parameterDependency.type;
  if (BitloopsPrimTypeIdentifiers.isArrayPrimType(propsNameType)) {
    throw new Error(`Entity props type of ${entityIdentifier} cannot be an array`);
  }
  const { output: propsName, dependencies: propsTypeDependencies } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: propsNameType,
  });

  dependencies = [...dependencies, ...propsTypeDependencies];

  if (constantVars) {
    // TODO fix with new model/types
    const constantVariablesModel = constantVariables(constantVars as any);
    result += constantVariablesModel.output;
    dependencies = [...dependencies, ...constantVariablesModel.dependencies];
  }

  result += initialEntityLangMapping(entityIdentifier, propsName);

  const entityCreateModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TEntityCreate,
    value: create,
  });
  result += entityCreateModel.output;
  dependencies = [...dependencies, ...entityCreateModel.dependencies];

  const gettersModel = generateGetters(propsName, modelForContext, methods);
  result += gettersModel.output;
  dependencies = [...dependencies, ...gettersModel.dependencies];

  if (methods) {
    const entityMethodsModel = entityMethods(methods);
    result += entityMethodsModel.output;
    dependencies = [...dependencies, ...entityMethodsModel.dependencies];
  }

  result += '}';

  const parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
    classType: ClassTypes.Entity,
    className: entityIdentifier,
  });

  return { output: result, dependencies: parentDependencies };
};

export { entityToTargetLanguage };
