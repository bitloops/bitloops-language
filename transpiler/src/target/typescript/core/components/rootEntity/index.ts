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
  TContextData,
  TDependenciesTypeScript,
  TRootEntities,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from './../../dependencies.js';
import { constantVariables, generateGetters } from '../domain/index.js';
import { domainMethods } from '../domain/domainMethods.js';
import { BitloopsPrimTypeIdentifiers } from './../../type-identifiers/bitloopsPrimType.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';

const ROOT_ENTITY_DEPENDENCIES: TDependenciesTypeScript = [
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

export const rootEntitiesToTargetLanguage = (params: {
  rootEntities: TRootEntities;
  model: IntermediateASTTree;
  contextData: TContextData;
}): TTargetDependenciesTypeScript => {
  const { rootEntities, model, contextData } = params;
  const { boundedContext, module } = contextData;
  const modelForContext = model[boundedContext][module];

  //TODO check extends
  const initialRootEntityLangMapping = (rootEntityName: string, propsName: string) =>
    `export class ${rootEntityName} extends Domain.Aggregate<${propsName}> { `;

  let res = '';
  let dependencies = ROOT_ENTITY_DEPENDENCIES;

  for (const [rootEntityName, rootEntity] of Object.entries(rootEntities)) {
    const { create, methods, constantVars } = rootEntity;
    const propsNameType = create.parameterDependency.type;
    if (BitloopsPrimTypeIdentifiers.isArrayPrimType(propsNameType)) {
      throw new Error('Root entity cannot take array as props yet.');
    }
    const { output: propsName, dependencies: rootEntityPropsTypeDependencies } =
      modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: propsNameType,
      });
    dependencies = [...dependencies, ...rootEntityPropsTypeDependencies];

    if (constantVars) {
      // TODO fix with new model/types
      const constantVariablesModel = constantVariables(constantVars as any);
      res += constantVariablesModel.output;
      dependencies = [...dependencies, ...constantVariablesModel.dependencies];
    }

    res += initialRootEntityLangMapping(rootEntityName, propsName);

    const aggregateCreateModel = modelToTargetLanguage({
      type: BitloopsTypesMapping.TEntityCreate,
      value: create,
    });
    res += aggregateCreateModel.output;
    dependencies = [...dependencies, ...aggregateCreateModel.dependencies];

    const gettersModel = generateGetters(propsName, modelForContext, methods);
    res += gettersModel.output;
    dependencies = [...dependencies, ...gettersModel.dependencies];

    if (methods) {
      const entityMethodsModel = domainMethods(methods);
      res += entityMethodsModel.output;
      dependencies = [...dependencies, ...entityMethodsModel.dependencies];
    }

    res += '}';

    dependencies = getParentDependencies(dependencies, {
      classType: ClassTypes.RootEntities,
      className: rootEntityName,
    });
  }

  return { output: res, dependencies };
};
