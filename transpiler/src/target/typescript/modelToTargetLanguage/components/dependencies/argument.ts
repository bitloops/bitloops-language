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
import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { TArgumentDependencies, TArgumentDependency, TEvaluatePrimitive } from '../../../types.js';
import { modelToTargetLanguage } from '../index.js';

const argumentDependenciesToTargetLanguage = (
  variable: TArgumentDependencies,
  targetLanguage: string,
): string => {
  let result = '(';
  if (variable) {
    for (const [index, argument] of variable.entries()) {
      result += modelToTargetLanguage({
        type: 'TArgumentDependency',
        value: argument,
        targetLanguage,
      });
      if (index < variable.length - 1) {
        result += ',';
      }
    }
  }
  result += ')';
  return result;
};

const argumentDependencyToTargetLanguage = (
  variable: TArgumentDependency,
  targetLanguage: string,
): string => {
  const argDependencyLangMapping: Record<string, (variable: TArgumentDependency) => string> = {
    [SupportedLanguages.TypeScript]: (variable: TArgumentDependency) => {
      if (variable.type === 'variable') {
        return variable.value;
      } else {
        const primitive: TEvaluatePrimitive = {
          type: variable.type,
          value: variable.value,
        };
        return modelToTargetLanguage({
          type: 'TEvaluatePrimitive',
          value: primitive,
          targetLanguage,
        });

        // // TODO differentiate 'string' | 'bool' | 'number'
        // if (variable.type === 'string') {
        //   return `'${variable.value}'`;
        // }
        // if (variable.type === 'bool') {
        //   if (variable.value !== 'true' && variable.value !== 'false') {
        //     throw new Error(`Invalid boolean value: ${variable}`);
        //   }
        //   return variable.value;
        // }
        // if (variable.type === 'number') {
        //   return `${+variable.value}`;
        // }
        // throw new Error(`Unsupported type: ${variable.type}`);
      }
    },
  };
  return argDependencyLangMapping[targetLanguage](variable);
};

export { argumentDependenciesToTargetLanguage, argumentDependencyToTargetLanguage };
