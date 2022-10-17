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

import { TValueObjects, TValueObjectMethods, TBoundedContexts } from '../../../types.js';
import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { modelToTargetLanguage, TContextData } from '../index.js';
import { BitloopsTypesMapping } from '../commons/index.js';
// import { isBitloopsPrimitive } from '../../../helpers/isBitloopsPrimitive.js';
// import { bitloopsTypeToLangMapping } from '../../../helpers/bitloopsPrimitiveToLang.js';
import { constantVariables, domainPrivateMethod, generateGetters } from '../domain/index.js';

//TODO maybe remove and replace with const variables
// const valueObjectFields = (variables: TConstantVariable[], targetLanguage: string): string => {
//   let result = '';
//   const objValConstantVariablesToLangMapping: any = {
//     [SupportedLanguages.TypeScript]: (variable: TConstantVariable): string => {
//       const { name, type, value } = variable;

//       let result: string;
//       if (type) {
//         let mappedType = type;
//         if (isBitloopsPrimitive(type)) {
//           mappedType = bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](variable.type);
//         }
//         result = `private static ${name}: ${mappedType}`;
//       } else {
//         result = `private static ${name}`;
//       }
//       if (value) {
//         result += ` = ${value}`;
//       }
//       result += ';';
//       return result;
//     },
//   };

//   for (const propVariable of variables) {
//     result += objValConstantVariablesToLangMapping[targetLanguage](propVariable);
//   }
//   return result;
// };

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
      result += constantVariables(constantVars, targetLanguage);
    }

    result += initialObjectValuesLangMapping[targetLanguage](valueObjectName, propsName);
    // Add this.props to constructor when overriding from bl

    result += modelToTargetLanguage({
      type: BitloopsTypesMapping.TDomainCreateMethod,
      value: create,
      targetLanguage,
      model: valueObjectName,
    });

    result += generateGetters(propsName, modelForContext, methods);

    // result += valueObjectFields(valueObject.constantVars, targetLanguage);

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
