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
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import {
  TArgumentList,
  TArgument,
  // TEvaluatePrimitive,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const argumentDependenciesToTargetLanguage = (
  variable: TArgumentList,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  let result = '(';
  if (variable) {
    for (const [index, argument] of variable.entries()) {
      const model = modelToTargetLanguage({
        type: BitloopsTypesMapping.TArgument,
        value: argument,
      });
      result += model.output;
      dependencies = [...dependencies, ...model.dependencies];
      if (index < variable.length - 1) {
        result += ',';
      }
    }
  }
  result += ')';
  return { output: result, dependencies };
};

const argumentDependencyToTargetLanguage = (
  argumentVariable: TArgument,
): TTargetDependenciesTypeScript => {
  return modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: argumentVariable.argument,
  });
  // const { argument: variable } = argumentVariable;
  // if (variable.type === 'variable') {
  //   return { output: variable.value, dependencies: [] };
  // } else {
  //   const primitive: TEvaluatePrimitive = {
  //     type: variable.type,
  //     value: variable.value,
  //   };
  //   return modelToTargetLanguage({
  //     type: BitloopsTypesMapping.TEvaluatePrimitive,
  //     value: primitive,
  //   });

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
};

export { argumentDependenciesToTargetLanguage, argumentDependencyToTargetLanguage };
