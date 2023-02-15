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
  TReadModel,
  TTargetDependenciesTypeScript,
  TVariables,
  fieldsKey,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { isArray, isUndefined } from '../../../../../helpers/typeGuards.js';

const readModelToTargetLanguage = (readModel: TReadModel): TTargetDependenciesTypeScript => {
  const result: TTargetDependenciesTypeScript = {
    output: '',
    dependencies: [],
  };

  const { fields, readModelIdentifier } = readModel.ReadModel;
  guardAgainstUndefinedAndArray({ fields });
  result.output += `export class ${readModelIdentifier} { `;

  result.output += 'constructor(';
  for (const field of fields) {
    const fieldIntermediateModel = modelToTargetLanguage({
      type: BitloopsTypesMapping.TVariable,
      value: field,
    });
    result.output += `public ${fieldIntermediateModel.output}, `;
    result.dependencies.push(...fieldIntermediateModel.dependencies);
  }
  result.output += ') {}';

  result.output += '}';

  return result;
};

const guardAgainstUndefinedAndArray = (variables: TVariables): void => {
  if (isUndefined(variables)) {
    throw new Error('Variables of Read Model are not defined');
  }
  if (!isArray(variables[fieldsKey])) {
    throw new Error('Variables of Read Model are not array');
  }
};

export { readModelToTargetLanguage };
