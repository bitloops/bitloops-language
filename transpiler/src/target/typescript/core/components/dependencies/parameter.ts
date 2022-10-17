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
import { bitloopsTypeToLangMapping } from '../../../helpers/bitloopsPrimitiveToLang.js';
import { isBitloopsPrimitive } from '../../../helpers/isBitloopsPrimitive.js';
import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { TParameterDependencies, TParameterDependency } from '../../../types.js';
import { BitloopsTypesMapping } from '../../helpers/mappings.js.js';
import { modelToTargetLanguage } from '../index.js.js';

// TODO fix parameter dependency to take private, public etc.
const parameterDependencyToTypescript = (variable: TParameterDependency): string => {
  if (isBitloopsPrimitive(variable.type)) {
    return `${variable.value}:${bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](
      variable.type,
    )}`;
  }
  return `${variable.value}:${variable.type}`;
};

const parameterDependencyToTargetLanguage = (
  variable: TParameterDependency,
  targetLanguage: string,
): string => {
  const argumentDependencyMapping: any = {
    [SupportedLanguages.TypeScript]: parameterDependencyToTypescript,
  };

  return argumentDependencyMapping[targetLanguage](variable);
};

const parameterDependenciesToTypescript = (
  variable: TParameterDependencies,
  targetLanguage: string,
): string => {
  let res = '(';
  for (let i = 0; i < variable.length; i += 1) {
    const arg = variable[i];
    res += modelToTargetLanguage({
      type: BitloopsTypesMapping.TParameterDependency,
      value: arg,
      targetLanguage,
    });
    if (i !== variable.length - 1) {
      res += ',';
    }
  }
  res += ')';
  return res;
};

const parameterDependenciesToTargetLanguage = (
  variable: TParameterDependencies,
  targetLanguage: string,
): string => {
  const argumentDependencyMapping: any = {
    [SupportedLanguages.TypeScript]: parameterDependenciesToTypescript,
  };

  return argumentDependencyMapping[targetLanguage](variable);
};

export { parameterDependencyToTargetLanguage, parameterDependenciesToTargetLanguage };

// const res = parameterDependenciesToTargetLanguage(
//   [
//     { value: 'arg1', type: 'string' },
//     { value: 'arg2', type: 'WhateverType' },
//   ],
//   'TypeScript',
// );
// console.log('res', res);

// const res2 = parameterDependencyToTargetLanguage({ value: 'arg1', type: 'string' }, 'TypeScript');
// console.log('res2', res2);
