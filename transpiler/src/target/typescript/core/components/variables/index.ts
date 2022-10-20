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
import { TTargetDependenciesTypeScript, TVariable, TVariables } from '../../../../../types.js';
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { isBitloopsPrimitive } from '../../../../../helpers/isBitloopsPrimitive.js';
import { bitloopsTypeToLangMapping } from '../../../../../helpers/bitloopsPrimitiveToLang.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const variableToTargetLanguage = (variable: TVariable): TTargetDependenciesTypeScript => {
  const { name, type, optional } = variable;
  const variableLangMapping = (name: string, type: string, optional: boolean): string =>
    `${name}${optional ? '?' : ''}: ${type}`;

  let mappedType = type;
  if (isBitloopsPrimitive(type)) {
    mappedType = bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](type);
  }
  return {
    output: variableLangMapping(name, mappedType, optional),
    dependencies: [],
  };
};

const variablesToTargetLanguage = (variable: TVariables): TTargetDependenciesTypeScript => {
  let dependencies;
  const variablesLangMapping = (variables): string => {
    let result = '';
    for (const variable of variables) {
      const variableResult = modelToTargetLanguage({
        type: BitloopsTypesMapping.TVariable,
        value: variable,
      });
      dependencies = [...dependencies, ...variableResult.dependencies];
      result += `${variableResult.output}; `;
    }
    return result;
  };

  return { output: variablesLangMapping(variable), dependencies };
};

export { variableToTargetLanguage, variablesToTargetLanguage };
