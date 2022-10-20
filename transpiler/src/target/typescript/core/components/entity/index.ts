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
  TBoundedContexts,
  TContextData,
  TEntities,
  TEntityMethods,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { domainMethods } from '../domain/domainMethods.js';
import { constantVariables, generateGetters } from '../domain/index.js';

const entityMethods = (objectValueMethods: TEntityMethods): TTargetDependenciesTypeScript => {
  const result = domainMethods(objectValueMethods);
  return { output: result.output, dependencies: result.dependencies };
};

const entitiesToTargetLanguage = (params: {
  entities: TEntities;
  model: TBoundedContexts;
  contextData: TContextData;
}): TTargetDependenciesTypeScript => {
  const { entities, model, contextData } = params;

  const { boundedContext, module } = contextData;

  const modelForContext = model[boundedContext][module];

  const initialObjectValuesLangMapping = (entityName: string, propsName: string) =>
    `export class ${entityName} extends Entity<${propsName}> { `;

  let result = '';
  let dependencies = [];
  for (const [entityName, entity] of Object.entries(entities)) {
    const { methods, create, constantVars } = entity;
    const propsName = create.parameterDependency.type;

    if (constantVars) {
      // TODO fix with new model/types
      const constantVariablesModel = constantVariables(constantVars as any);
      result += constantVariablesModel.output;
      dependencies = [...dependencies, ...constantVariablesModel.dependencies];
    }

    result += initialObjectValuesLangMapping(entityName, propsName);

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
  }

  return { output: result, dependencies: [] };
};

export { entitiesToTargetLanguage };
