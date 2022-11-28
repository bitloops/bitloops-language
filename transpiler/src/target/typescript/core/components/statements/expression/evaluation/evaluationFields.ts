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

import { TEvaluationFields, TTargetDependenciesTypeScript } from '../../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';

export const evaluationFieldsToTargetLanguage = (
  properties: TEvaluationFields,
): TTargetDependenciesTypeScript => {
  let langFields = {};

  const addToFieldsLangMapping = (fieldsObject, key, value: TTargetDependenciesTypeScript) => ({
    ...fieldsObject,
    [key]: value.output,
  });

  let dependencies = [];
  for (const property of properties) {
    const { name, expression } = property.evaluationField;

    const expressionModel = modelToTargetLanguage({
      type: BitloopsTypesMapping.TExpression,
      value: { expression },
    });
    langFields = addToFieldsLangMapping(langFields, name, expressionModel);
    dependencies = [...dependencies, ...expressionModel.dependencies];
  }

  const fieldsFinalLangMapping = (langFields): string => {
    return `{${Object.keys(langFields)
      .map((key) => `${key}:${langFields[key]}`)
      .join(',')}}`;
  };
  return { output: fieldsFinalLangMapping(langFields), dependencies };
};
