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
import { isUndefined, isArray } from '../../../../../helpers/typeGuards.js';
import { TDTO, TDTOValues, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const DTOToTargetLanguage = (dto: TDTO): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies;
  const dtoKeys = Object.keys(dto);
  for (let i = 0; i < dtoKeys.length; i++) {
    const dtoName = dtoKeys[i];
    const dtoValues = dto[dtoName];
    const model = modelToTargetLanguage({
      type: BitloopsTypesMapping.TDTOValues,
      value: dtoValues,
    });
    result += `export interface ${dtoName} { `;
    result += model.output;
    result += '}';
    dependencies = [...dependencies, ...model.dependencies];
  }

  return { output: result, dependencies };
};

const DTOValuesToTargetLanguage = (variable: TDTOValues): TTargetDependenciesTypeScript => {
  if (isUndefined(variable.fields)) {
    throw new Error('Fields of DTO are not defined');
  }
  if (!isArray(variable.fields)) {
    throw new Error('Fields of DTO are not array');
  }
  const variablesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TVariables,
    value: variable.fields,
  });
  return variablesResult;
};

export { DTOToTargetLanguage, DTOValuesToTargetLanguage };
