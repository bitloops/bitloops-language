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
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { TStatements, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

//TODO props now must always have an id field (fix this not to be mandatory)
export const internalConstructor = (
  propsName: string,
  statements: TStatements,
  classType: string,
): TTargetDependenciesTypeScript => {
  let superString;
  if (classType === ClassTypes.Entity) {
    superString = 'super(props, props.id)';
  } else {
    superString = 'super(props)';
  }
  let res = `private constructor(props: ${propsName}) { ${superString}; `;
  let dependencies = [];
  if (statements) {
    const statementsResult = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: statements,
    });
    res += statementsResult.output;
    dependencies = statementsResult.dependencies;
  }
  res += '}';
  return { output: res, dependencies };
};
