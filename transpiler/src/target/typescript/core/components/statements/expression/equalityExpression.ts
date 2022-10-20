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
import { TEqualityExpression, TTargetDependenciesTypeScript } from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

export const equalityExpressionToTargetLanguage = (
  value: TEqualityExpression,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (value: TEqualityExpression): string | Error => {
      const { equalityExpression } = value;
      const { left, operator, right } = equalityExpression;

      const targetLangOperator = modelToTargetLanguage({
        type: BitloopsTypesMapping.TEqualityOperator,
        value: operator,
        targetLanguage,
      });

      const leftExpression = modelToTargetLanguage({
        type: BitloopsTypesMapping.TExpressionValues,
        value: left,
        targetLanguage,
      });

      const rightExpression = modelToTargetLanguage({
        type: BitloopsTypesMapping.TExpressionValues,
        value: right,
        targetLanguage,
      });

      return `${leftExpression} ${targetLangOperator} ${rightExpression}`;
    },
  };
  return langMapping[targetLanguage](value);
};

// // a == b
// const expression: TEqualityExpression = {
//   equalityExpression: {
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
//     operator: '==',
//   },
// };

// const eq = equalityExpressionToTargetLanguage(expression, SupportedLanguages.TypeScript);
// console.log('eq', eq);
