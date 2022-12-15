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
import { TParameter, TParameterList, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

// TODO fix parameter dependency to take private, public etc.
const parameterDependencyToTargetLanguage = (
  variable: TParameter,
): TTargetDependenciesTypeScript => {
  const { parameter } = variable;
  const mappedType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: parameter.type,
  });
  return {
    output: `${parameter.value}:${mappedType.output}`,
    dependencies: mappedType.dependencies,
  };
};

const parameterDependenciesToTargetLanguage = (
  variable: TParameterList,
): TTargetDependenciesTypeScript => {
  console.log('variable', variable);
  const { parameters } = variable;
  let res = '(';
  const finalDependencies = [];
  for (let i = 0; i < parameters.length; i += 1) {
    const arg = parameters[i];
    const { output, dependencies } = modelToTargetLanguage({
      type: BitloopsTypesMapping.TParameter,
      value: arg,
    });
    res += output;
    finalDependencies.push(...dependencies);
    if (i !== parameters.length - 1) {
      res += ',';
    }
  }
  res += ')';
  return { output: res, dependencies: finalDependencies };
};

export { parameterDependencyToTargetLanguage, parameterDependenciesToTargetLanguage };
