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
  TTargetDependenciesTypeScript,
  TValueObjectMethods,
  TValueObjects,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { constantVariables, domainPrivateMethod, generateGetters } from '../domain/index.js';

const valueObjectMethods = (
  valueObjectMethods: TValueObjectMethods,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  let dependencies;
  const result = Object.entries(valueObjectMethods).reduce((acc, [methodName, methodInfo]) => {
    acc += domainPrivateMethod(methodName, methodInfo, targetLanguage).output;
    dependencies = [
      ...dependencies,
      ...domainPrivateMethod(methodName, methodInfo, targetLanguage).dependencies,
    ];
    return acc;
  }, '');

  return { output: result, dependencies };
};

const valueObjectsToTargetLanguage = (params: {
  valueObjects: TValueObjects;
  model: TBoundedContexts;
  targetLanguage: string;
  contextData: TContextData;
}): TTargetDependenciesTypeScript => {
  const { valueObjects, model, targetLanguage, contextData } = params;

  const { boundedContext, module } = contextData;

  const modelForContext = model[boundedContext][module];

  const initialObjectValuesLangMapping = {
    [SupportedLanguages.TypeScript]: (voName: string, propsName: string) =>
      `export class ${voName} extends ValueObject<${propsName}> { `,
  };

  let result = '';
  let dependencies;
  for (const [valueObjectName, valueObject] of Object.entries(valueObjects)) {
    const { methods, create, constantVars } = valueObject;
    const propsName = create.parameterDependency.type;

    if (constantVars) {
      // TODO FIx with new type
      result += constantVariables(constantVars as any, targetLanguage).output;
      dependencies = [
        ...dependencies,
        ...constantVariables(constantVars as any, targetLanguage).dependencies,
      ];
    }

    result += initialObjectValuesLangMapping[targetLanguage](valueObjectName, propsName);
    // Add this.props to constructor when overriding from bl

    result += modelToTargetLanguage({
      type: BitloopsTypesMapping.TDomainCreateMethod,
      value: create,
      targetLanguage,
    }).output;
    dependencies = [
      ...dependencies,
      modelToTargetLanguage({
        type: BitloopsTypesMapping.TDomainCreateMethod,
        value: create,
        targetLanguage,
      }).dependencies,
    ];

    result += generateGetters(propsName, modelForContext, methods, targetLanguage).output;
    dependencies = [
      ...dependencies,
      ...generateGetters(propsName, modelForContext, methods, targetLanguage).dependencies,
    ];

    if (methods) {
      result += valueObjectMethods(methods, targetLanguage).output;
      dependencies = [...dependencies, ...valueObjectMethods(methods, targetLanguage).dependencies];
    }

    const finalObjValLangMapping: any = {
      [SupportedLanguages.TypeScript]: '}',
    };
    result += finalObjValLangMapping[targetLanguage];
  }

  return { output: result, dependencies: [] };
};

export { valueObjectsToTargetLanguage };
