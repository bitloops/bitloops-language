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
import { TEntities, TEntityMethods } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { domainMethods } from '../domain/domainMethods.js';
import { constantVariables } from '../domain/index.js';

// const entityFields = (variables: TConstantVariable[], targetLanguage: string): string => {
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

const entityMethods = (objectValueMethods: TEntityMethods, targetLanguage: string): string => {
  return domainMethods(objectValueMethods, targetLanguage);
};

const entitiesToTargetLanguage = (entities: TEntities, targetLanguage: string): string => {
  const initialObjectValuesLangMapping = {
    [SupportedLanguages.TypeScript]: (entityName: string, propsName: string) =>
      `export class ${entityName} extends Entity<${propsName}> { `,
  };

  let result = '';
  for (const [valueObjectName, valueObject] of Object.entries(entities)) {
    const { methods, create, constantVars } = valueObject;
    const propsName = create.parameterDependency.type;

    if (constantVars) {
      result += constantVariables(constantVars, targetLanguage);
    }

    result += initialObjectValuesLangMapping[targetLanguage](valueObjectName, propsName);

    // result += internalConstructor(propsName, targetLanguage);

    // result += entityFields(valueObject.constantVars, targetLanguage);

    result += modelToTargetLanguage({
      type: BitloopsTypesMapping.TDomainCreateMethod,
      value: create,
      targetLanguage,
    });

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
