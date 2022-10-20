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
  TMultiplicativeExpression,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

export const multiplicativeExpressionToTargetLanguage = (
  value: TMultiplicativeExpression,
): TTargetDependenciesTypeScript => {
  const langMapping = (value: TMultiplicativeExpression): TTargetDependenciesTypeScript => {
    const { multiplicativeExpression } = value;
    const { left, operator, right } = multiplicativeExpression;

    const targetLangOperator = modelToTargetLanguage({
      type: BitloopsTypesMapping.TMultiplicativeOperator,
      value: operator,
    });

    const leftExpression = modelToTargetLanguage({
      type: BitloopsTypesMapping.TExpressionValues,
      value: left,
    });

    const rightExpression = modelToTargetLanguage({
      type: BitloopsTypesMapping.TExpressionValues,
      value: right,
    });

    return {
      output: `${leftExpression.output} ${targetLangOperator.output} ${rightExpression.output}`,
      dependencies: [
        ...leftExpression.dependencies,
        ...rightExpression.dependencies,
        ...targetLangOperator.dependencies,
      ],
    };
  };
  return langMapping(value);
};

// // a * b
// const expression: TMultiplicativeExpression = {
//   multiplicativeExpression: {
//     left: {
//       expression: {
//         evaluation: {
//           regularEvaluation: {
//             type: 'variable',
//             value: 'a',
//           },
//         },
//       },
//     },
//     right: {
//       expression: {
//         evaluation: {
//           regularEvaluation: {
//             type: 'variable',
//             value: 'b',
//           },
//         },
//       },
//     },
//     operator: '*',
//   },
// };

// const multi = multiplicativeExpressionToTargetLanguage(expression, SupportedLanguages.TypeScript);
// console.log('multi', multi);
