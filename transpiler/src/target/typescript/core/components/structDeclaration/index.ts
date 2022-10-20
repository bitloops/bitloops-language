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
import {
  TStructs,
  TStructDeclaration,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const structDeclarationToTargetLanguage = (struct: TStructs): TTargetDependenciesTypeScript => {
  const initialStructLangMapping = (structName: string): string => `export type ${structName} = { `;
  const finalStructLangMapping = '};';

  let result = '';
  let dependencies;
  const structKeys = Object.keys(struct);
  for (let i = 0; i < structKeys.length; i++) {
    const structName = structKeys[i];
    const structValues = struct[structName];
    result += initialStructLangMapping(structName);
    result += modelToTargetLanguage({
      type: BitloopsTypesMapping.TStructDeclaration,
      value: structValues,
    }).output;
    dependencies = [
      ...dependencies,
      ...modelToTargetLanguage({
        type: BitloopsTypesMapping.TStructDeclaration,
        value: structValues,
      }).dependencies,
    ];
    result += finalStructLangMapping;
  }

  return { output: result, dependencies };
};

const structDeclarationValuesToTargetLanguage = (
  variable: TStructDeclaration,
): TTargetDependenciesTypeScript => {
  if (isUndefined(variable.fields)) {
    throw new Error('Fields of Struct are not defined');
  }
  if (!isArray(variable.fields)) {
    throw new Error('Fields of Struct are not array');
  }
  const variablesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TVariables,
    value: variable.fields,
  });
  return variablesResult;
};

export { structDeclarationToTargetLanguage, structDeclarationValuesToTargetLanguage };
