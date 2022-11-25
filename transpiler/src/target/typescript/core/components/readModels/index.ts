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
import { TReadModels, TTargetDependenciesTypeScript, TVariables } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { isArray, isUndefined } from '../../../../../helpers/typeGuards.js';

const readModelsToTargetLanguage = (readModels: TReadModels): TTargetDependenciesTypeScript => {
  const initialPropsLangMapping = (propName: string): string => `export type ${propName} = { `;
  const finalPropsLangMapping = '} | null';
  const result: TTargetDependenciesTypeScript = {
    output: '',
    dependencies: [],
  };

  return Object.entries(readModels).reduce((acc, [readModelName, readModelValues]) => {
    guardAgainstUndefinedAndArray(readModelValues.variables);
    acc.output += initialPropsLangMapping(readModelName);

    const readModelIntermediateModel = modelToTargetLanguage({
      type: BitloopsTypesMapping.TVariables,
      value: readModelValues.variables,
    });

    acc.output += readModelIntermediateModel.output;
    acc.dependencies = [...acc.dependencies, ...readModelIntermediateModel.dependencies];
    acc.output += finalPropsLangMapping;

    return acc;
  }, result);
};

const guardAgainstUndefinedAndArray = (variables: TVariables): void => {
  if (isUndefined(variables)) {
    throw new Error('Variables of Prop are not defined');
  }
  if (!isArray(variables)) {
    throw new Error('Variables of Prop are not array');
  }
};

export { readModelsToTargetLanguage };
