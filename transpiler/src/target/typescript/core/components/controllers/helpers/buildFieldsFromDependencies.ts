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
import { SupportedLanguages } from '../../../../../../helpers/supportedLanguages.js';
import { TParameterDependencies } from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

const buildFieldsFromDependencies = (
  params: TParameterDependencies,
  targetLanguage: string,
  contextData: { boundedContext: string; module: string },
): string => {
  const fieldsToLangMapping = {
    [SupportedLanguages.TypeScript]: (params: TParameterDependencies): string => {
      return params
        .map((parameterDependency) => {
          const { type, value } = parameterDependency;
          return `private ${value}: ${type};`;
        })
        .join(' ');
    },
  };

  let result = fieldsToLangMapping[targetLanguage](params);

  const paramsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: params,
    targetLanguage,
    contextData,
  });
  const constructorToLangMapping = {
    [SupportedLanguages.TypeScript]: (
      paramsString: string,
      params: TParameterDependencies,
    ): string => {
      const constructorBody = params
        .map((parameterDependency) => {
          const { value } = parameterDependency;
          return `this.${value} = ${value};`;
        })
        .join(' ');
      return `constructor${paramsString} { super(); ${constructorBody} }`;
    },
  };
  result += constructorToLangMapping[targetLanguage](paramsString, params);
  return result;
};
export { buildFieldsFromDependencies };
