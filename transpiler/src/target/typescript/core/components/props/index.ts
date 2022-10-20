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
import { TProps, TPropsValues, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const propsToTargetLanguage = (props: TProps): TTargetDependenciesTypeScript => {
  const initialPropsLangMapping = (propName: string): string => `export interface ${propName} { `;
  const finalPropsLangMapping = '}';
  let dependencies = [];
  let result = '';
  const propsKeys = Object.keys(props);
  for (let i = 0; i < propsKeys.length; i++) {
    const propName = propsKeys[i];
    const propsValues = props[propName];
    result += initialPropsLangMapping(propName);
    result += modelToTargetLanguage({
      type: BitloopsTypesMapping.TPropsValues,
      value: propsValues,
    }).output;
    dependencies = [
      ...dependencies,
      ...modelToTargetLanguage({
        type: BitloopsTypesMapping.TPropsValues,
        value: propsValues,
      }).dependencies,
    ];
    result += finalPropsLangMapping;
  }
  return { output: result, dependencies };
};

const propsValuesToTargetLanguage = (propsValues: TPropsValues): TTargetDependenciesTypeScript => {
  console.log('propsValuesToTargetLanguage', propsValues);
  if (isUndefined(propsValues.variables)) {
    throw new Error('Variables of Prop are not defined');
  }
  if (!isArray(propsValues.variables)) {
    throw new Error('Variables of Prop are not array');
  }
  const variablesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TVariables,
    value: propsValues.variables,
  });
  return variablesResult;
};

export { propsToTargetLanguage, propsValuesToTargetLanguage };
