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

import { TErrorEvaluation, TTargetDependenciesTypeScript } from '../../../../../types.js';

export const bitloopsErrorEvaluationToTargetLanguage = (
  variable: TErrorEvaluation,
): TTargetDependenciesTypeScript => {
  const { errorEvaluation } = variable;
  const { name, argumentDependencies } = errorEvaluation;
  let output = `new ${name}(`;
  if (argumentDependencies && argumentDependencies.length > 0) {
    argumentDependencies.forEach((argument) => {
        console.log('argument')
      output += `${argument},`;
    });
    output = output.slice(0, -1);
  }
  output += ')';
  return {
    output,
    dependencies: [],
  };
};
