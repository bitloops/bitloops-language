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
import { isUndefined, isArray } from '../../../../../helpers/typeGuards.js';
import { TDTO, TDTOValues } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const DTOToTargetLanguage = (dto: TDTO, targetLanguage: string): string => {
  const initialDTOLangMapping: any = {
    [SupportedLanguages.TypeScript]: (dtoName: string) => `export interface ${dtoName} { `,
  };
  const finalDTOLangMapping: any = {
    [SupportedLanguages.TypeScript]: '}',
  };

  let result = '';
  const dtoKeys = Object.keys(dto);
  for (let i = 0; i < dtoKeys.length; i++) {
    const dtoName = dtoKeys[i];
    const dtoValues = dto[dtoName];
    result += initialDTOLangMapping[targetLanguage](dtoName);
    result += modelToTargetLanguage({
      type: BitloopsTypesMapping.TDTOValues,
      value: dtoValues,
      targetLanguage,
    });
    result += finalDTOLangMapping[targetLanguage];
  }

  return result;
};

const DTOValuesToTargetLanguage = (variable: TDTOValues, targetLanguage: string): string => {
  if (isUndefined(variable.fields)) {
    throw new Error('Fields of DTO are not defined');
  }
  if (!isArray(variable.fields)) {
    throw new Error('Fields of DTO are not array');
  }
  const variablesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TVariables,
    value: variable.fields,
    targetLanguage,
  });
  return variablesResult;
};

export { DTOToTargetLanguage, DTOValuesToTargetLanguage };
