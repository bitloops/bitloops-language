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
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const variableToTargetLanguage = (variable: TVariable): TTargetDependenciesTypeScript => {
  const { name, type, optional } = variable;

  const mappedType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: type,
  });

  const result = `${name}${optional ? '?' : ''}: ${mappedType.output}`;
  return {
    output: result,
    dependencies: mappedType.dependencies,
  };
};

const variablesToTargetLanguage = (variables: TVariables): TTargetDependenciesTypeScript => {
  let dependencies = [];
  let result = '';
  for (const variable of variables) {
    const variableResult = modelToTargetLanguage({
      type: BitloopsTypesMapping.TVariable,
      value: variable,
    });
    dependencies = [...dependencies, ...variableResult.dependencies];
    result += `${variableResult.output}; `;
  }

  return { output: result, dependencies };
};

export { variableToTargetLanguage, variablesToTargetLanguage };
