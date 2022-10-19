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
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TBoundedContexts, TContextData, TEntities, TEntityMethods } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { domainMethods } from '../domain/domainMethods.js';
import { constantVariables, generateGetters } from '../domain/index.js';

const entityMethods = (objectValueMethods: TEntityMethods, targetLanguage: string): string => {
  return domainMethods(objectValueMethods, targetLanguage);
};

const entitiesToTargetLanguage = (params: {
  entities: TEntities;
  model: TBoundedContexts;
  targetLanguage: string;
  contextData: TContextData;
}): string => {
  const { entities, model, targetLanguage, contextData } = params;

  const { boundedContext, module } = contextData;

  const modelForContext = model[boundedContext][module];

  const initialObjectValuesLangMapping = {
    [SupportedLanguages.TypeScript]: (entityName: string, propsName: string) =>
      `export class ${entityName} extends Entity<${propsName}> { `,
  };

  let result = '';
  for (const [entityName, entity] of Object.entries(entities)) {
    const { methods, create, constantVars } = entity;
    const propsName = create.parameterDependency.type;

    if (constantVars) {
      // TODO fix with new model/types
      result += constantVariables(constantVars as any, targetLanguage);
    }

    result += initialObjectValuesLangMapping[targetLanguage](entityName, propsName);

    result += modelToTargetLanguage({
      type: BitloopsTypesMapping.TEntityCreate,
      value: create,
      targetLanguage,
    });

    result += generateGetters(propsName, modelForContext, methods, targetLanguage);

    if (methods) {
      result += entityMethods(methods, targetLanguage);
    }

    const finalObjValLangMapping: any = {
      [SupportedLanguages.TypeScript]: '}',
    };
    result += finalObjValLangMapping[targetLanguage];
  }

  return result;
};

export { entitiesToTargetLanguage };
