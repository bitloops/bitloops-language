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
import {
  TNotExpression,
  TOrExpression,
  TAndExpression,
  TXorExpression,
  TLogicalExpression,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

enum LOGICAL_OPERATORS_TYPESCRIPT {
  OR = '||',
  AND = '&&',
  NOT = '!',
}

enum LOGICAL_EXPRESSION_MODEL_IDs {
  NOT = 'notExpression',
  OR = 'orExpression',
  AND = 'andExpression',
  XOR = 'xorExpression',
}

export const notExpressionToTargetLanguage = (
  value: TNotExpression,
  targetLanguage: string,
): string => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (value: TNotExpression): string | Error => {
      const { notExpression } = value;

      const expression = modelToTargetLanguage({
        type: BitloopsTypesMapping.TExpressionValues,
        value: notExpression,
        targetLanguage,
      });

      return `${LOGICAL_OPERATORS_TYPESCRIPT.NOT} ${expression}`;
    },
  };
  return langMapping[targetLanguage](value);
};

export const orExpressionToTargetLanguage = (
  value: TOrExpression,
  targetLanguage: string,
): string => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (value: TOrExpression): string | Error => {
      const { orExpression } = value;
      const { left, right } = orExpression;

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

      return `${leftExpression} ${LOGICAL_OPERATORS_TYPESCRIPT.OR} ${rightExpression}`;
    },
  };
  return langMapping[targetLanguage](value);
};

export const andExpressionToTargetLanguage = (
  value: TAndExpression,
  targetLanguage: string,
): string => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (value: TAndExpression): string | Error => {
      const { andExpression } = value;
      const { left, right } = andExpression;

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

      return `${leftExpression} ${LOGICAL_OPERATORS_TYPESCRIPT.AND} ${rightExpression}`;
    },
  };
  return langMapping[targetLanguage](value);
};

export const xorExpressionToTargetLanguage = (
  value: TXorExpression,
  targetLanguage: string,
): string => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (value: TXorExpression): string | Error => {
      const { xorExpression } = value;
      const { left, right } = xorExpression;

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

      return `(${leftExpression} ${LOGICAL_OPERATORS_TYPESCRIPT.AND} ${LOGICAL_OPERATORS_TYPESCRIPT.NOT} ${rightExpression}) ${LOGICAL_OPERATORS_TYPESCRIPT.OR} (${LOGICAL_OPERATORS_TYPESCRIPT.NOT} ${leftExpression} ${LOGICAL_OPERATORS_TYPESCRIPT.AND} ${rightExpression})`;
    },
  };
  return langMapping[targetLanguage](value);
};

export const logicalExpressionToTargetLanguage = (
  value: TLogicalExpression,
  targetLanguage: string,
): string => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (value: TLogicalExpression): string | Error => {
      const { logicalExpression } = value;

      if (LOGICAL_EXPRESSION_MODEL_IDs.NOT in logicalExpression) {
        return modelToTargetLanguage({
          type: BitloopsTypesMapping.TNotExpression,
          value: logicalExpression,
          targetLanguage,
        });
      }

      if (LOGICAL_EXPRESSION_MODEL_IDs.OR in logicalExpression) {
        return modelToTargetLanguage({
          type: BitloopsTypesMapping.TOrExpression,
          value: logicalExpression,
          targetLanguage,
        });
      }

      if (LOGICAL_EXPRESSION_MODEL_IDs.AND in logicalExpression) {
        return modelToTargetLanguage({
          type: BitloopsTypesMapping.TAndExpression,
          value: logicalExpression,
          targetLanguage,
        });
      }

      if (LOGICAL_EXPRESSION_MODEL_IDs.XOR in logicalExpression) {
        return modelToTargetLanguage({
          type: BitloopsTypesMapping.TXorExpression,
          value: logicalExpression,
          targetLanguage,
        });
      }

      throw new Error('Unsupported logical expression');
    },
  };
  return langMapping[targetLanguage](value);
};

// // NOT a
// const expression: TNotExpression = {
//   notExpression: {
//     expression: {
//       evaluation: {
//         regularEvaluation: {
//           type: 'variable',
//           value: 'a',
//         },
//       },
//     },
//   },
// };

// const notExp = notExpressionToTargetLanguage(expression, SupportedLanguages.TypeScript);
// console.log('notExp', notExp);

// // a OR b
// const ORexpression: TOrExpression = {
//   orExpression: {
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
//   },
// };

// const OrExp = orExpressionToTargetLanguage(ORexpression, SupportedLanguages.TypeScript);
// console.log('OrExp', OrExp);

// // a AND b
// const andExpression: TAndExpression = {
//   andExpression: {
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
//   },
// };

// const andExp = andExpressionToTargetLanguage(andExpression, SupportedLanguages.TypeScript);
// console.log('andExp', andExp);

// const logicalExpression: TLogicalExpression = {
//   logicalExpression: {
//     xorExpression: {
//       left: {
//         expression: {
//           evaluation: {
//             regularEvaluation: {
//               type: 'variable',
//               value: 'a',
//             },
//           },
//         },
//       },
//       right: {
//         expression: {
//           evaluation: {
//             regularEvaluation: {
//               type: 'variable',
//               value: 'b',
//             },
//           },
//         },
//       },
//     },
//   },
// };

// const logExp = logicalExpressionToTargetLanguage(logicalExpression, SupportedLanguages.TypeScript);
// console.log('logExp', logExp);
