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
import {
  TBoundedContexts,
  TContextData,
  TValueObjectMethods,
  TValueObjects,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { constantVariables, domainPrivateMethod, generateGetters } from '../domain/index.js';

const valueObjectMethods = (
  valueObjectMethods: TValueObjectMethods,
  targetLanguage: string,
): string => {
  const result = Object.entries(valueObjectMethods).reduce((acc, [methodName, methodInfo]) => {
    acc += domainPrivateMethod(methodName, methodInfo, targetLanguage);
    return acc;
  }, '');

  return result;
};

const valueObjectsToTargetLanguage = (params: {
  valueObjects: TValueObjects;
  model: TBoundedContexts;
  targetLanguage: string;
  contextData: TContextData;
}): string => {
  const { valueObjects, model, targetLanguage, contextData } = params;

  const { boundedContext, module } = contextData;

  const modelForContext = model[boundedContext][module];

  const initialObjectValuesLangMapping = {
    [SupportedLanguages.TypeScript]: (voName: string, propsName: string) =>
      `export class ${voName} extends ValueObject<${propsName}> { `,
  };

  let result = '';
  for (const [valueObjectName, valueObject] of Object.entries(valueObjects)) {
    const { methods, create, constantVars } = valueObject;
    const propsName = create.parameterDependency.type;

    if (constantVars) {
      // TODO FIx with new type
      result += constantVariables(constantVars as any, targetLanguage);
    }

    result += initialObjectValuesLangMapping[targetLanguage](valueObjectName, propsName);
    // Add this.props to constructor when overriding from bl

    result += modelToTargetLanguage({
      type: BitloopsTypesMapping.TDomainCreateMethod,
      value: create,
      targetLanguage,
    });

    result += generateGetters(propsName, modelForContext, methods, targetLanguage);

    if (methods) {
      result += valueObjectMethods(methods, targetLanguage);
    }

    const finalObjValLangMapping: any = {
      [SupportedLanguages.TypeScript]: '}',
    };
    result += finalObjValLangMapping[targetLanguage];
  }

  return result;
};

export { valueObjectsToTargetLanguage };
