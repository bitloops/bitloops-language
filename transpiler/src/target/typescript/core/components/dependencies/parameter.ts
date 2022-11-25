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
import {
  TParameterDependency,
  TParameterDependencies,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

// TODO fix parameter dependency to take private, public etc.
const parameterDependencyToTypescript = (
  variable: TParameterDependency,
): TTargetDependenciesTypeScript => {
  const mappedType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: variable.type,
  });
  return {
    output: `${variable.value}:${mappedType.output}`,
    dependencies: mappedType.dependencies,
  };
};

const parameterDependencyToTargetLanguage = (
  variable: TParameterDependency,
): TTargetDependenciesTypeScript => {
  const { output, dependencies } = parameterDependencyToTypescript(variable);
  return { output, dependencies };
};

const parameterDependenciesToTypescript = (
  variable: TParameterDependencies,
): TTargetDependenciesTypeScript => {
  let res = '(';
  let finalDependencies = [];
  for (let i = 0; i < variable.length; i += 1) {
    const arg = variable[i];
    const { output, dependencies } = modelToTargetLanguage({
      type: BitloopsTypesMapping.TParameterDependency,
      value: arg,
    });
    res += output;
    finalDependencies = [...finalDependencies, ...dependencies];
    if (i !== variable.length - 1) {
      res += ',';
    }
  }
  res += ')';
  return { output: res, dependencies: finalDependencies };
};

const parameterDependenciesToTargetLanguage = (
  variable: TParameterDependencies,
): TTargetDependenciesTypeScript => {
  return parameterDependenciesToTypescript(variable);
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
