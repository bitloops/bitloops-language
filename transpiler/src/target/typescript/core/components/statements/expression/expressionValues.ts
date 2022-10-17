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
import { TExpressionValues } from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';
import { evaluationToTargetLanguage, instanceOfToTargetLanguage } from './evaluation/index.js';

export { evaluationToTargetLanguage, instanceOfToTargetLanguage };

enum INDICATORS {
  RELATIONAL_EXPRESSION = 'relationalExpression',
  LOGICAL_EXPRESSION = 'logicalExpression',
  ADDITIVE_EXPRESSION = 'additiveExpression',
  MULTIPLICATIVE_EXPRESSION = 'multiplicativeExpression',
  EQUALITY_EXPRESSION = 'equalityExpression',
  PARENTHESIZED_EXPRESSION = 'parenthesizedExpression',
}

const expressionValuesToTargetLanguage = (
  expressionValue: TExpressionValues,
  targetLanguage: string,
): string => {
  if (!expressionValue) {
    throw new Error(`Unsupported expression: ${expressionValue}`);
  }

  if ('evaluation' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TEvaluation,
      value: expressionValue,
      targetLanguage,
    });
  }
  if ('classInstantiation' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TClassInstantiation,
      value: expressionValue,
      targetLanguage,
    });
  }
  if ('struct' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TStructEvaluation,
      value: expressionValue,
      targetLanguage,
    });
  }
  if ('backTickString' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TBackTickString,
      value: expressionValue,
      targetLanguage,
    });
  }
  if (INDICATORS.EQUALITY_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TEqualityExpression,
      value: expressionValue,
      targetLanguage,
    });
  }

  if (INDICATORS.ADDITIVE_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TAdditiveExpression,
      value: expressionValue,
      targetLanguage,
    });
  }
  if (INDICATORS.LOGICAL_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TLogicalExpression,
      value: expressionValue,
      targetLanguage,
    });
  }

  if (INDICATORS.RELATIONAL_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TRelationalExpression,
      value: expressionValue,
      targetLanguage,
    });
  }

  if (INDICATORS.MULTIPLICATIVE_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TMultiplicativeExpression,
      value: expressionValue,
      targetLanguage,
    });
  }
  if (INDICATORS.PARENTHESIZED_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TParenthesizedExpression,
      value: expressionValue,
      targetLanguage,
    });
  }

  throw new Error(`Unsupported expression: ${expressionValue}`);
};

export { expressionValuesToTargetLanguage };
