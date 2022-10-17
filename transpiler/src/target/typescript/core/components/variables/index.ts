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
import { TVariable, TVariables } from '../../../../../types.js';
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { isBitloopsPrimitive } from '../../../../../helpers/isBitloopsPrimitive.js';
import { bitloopsTypeToLangMapping } from '../../../../../helpers/bitloopsPrimitiveToLang.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const variableToTargetLanguage = (variable: TVariable, targetLanguage: string): string => {
  const { name, type, optional } = variable;
  const variableLangMapping: any = {
    [SupportedLanguages.TypeScript]: (name: string, type: string, optional: boolean) =>
      `${name}${optional ? '?' : ''}: ${type}`,
  };

  let mappedType = type;
  if (isBitloopsPrimitive(type)) {
    mappedType = bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](variable.type);
  }
  return variableLangMapping[targetLanguage](name, mappedType, optional);
};

const variablesToTargetLanguage = (variable: TVariables, targetLanguage: string): string => {
  const variablesLangMapping: any = {
    [SupportedLanguages.TypeScript]: (variables) => {
      let result = '';
      for (const variable of variables) {
        const variableResult = modelToTargetLanguage({
          type: BitloopsTypesMapping.TVariable,
          value: variable,
          targetLanguage,
        });
        result += `${variableResult}; `;
      }
      return result;
    },
  };

  return variablesLangMapping[targetLanguage](variable);
};

export { variableToTargetLanguage, variablesToTargetLanguage };
