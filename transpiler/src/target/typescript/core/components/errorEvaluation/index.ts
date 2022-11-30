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

import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TErrorEvaluation, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { getChildDependencies } from '../../dependencies.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export const bitloopsErrorEvaluationToTargetLanguage = (
  variable: TErrorEvaluation,
): TTargetDependenciesTypeScript => {
  const { errorEvaluation } = variable;
  const { name, argumentList } = errorEvaluation;

  const argumentDependenciesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TArgumentList,
    value: argumentList,
  });
  const output = `new ${name}${argumentDependenciesResult.output}`;
  let dependencies;
  if (
    argumentDependenciesResult.dependencies &&
    argumentDependenciesResult.dependencies.length > 0
  ) {
    dependencies = [...getChildDependencies(name), ...argumentDependenciesResult.dependencies];
  } else {
    dependencies = [...getChildDependencies(name)];
  }
  return {
    output,
    dependencies,
  };
};
