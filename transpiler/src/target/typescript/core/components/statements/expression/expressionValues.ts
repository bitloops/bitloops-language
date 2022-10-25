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
import { TExpressionValues, TTargetDependenciesTypeScript } from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
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
): TTargetDependenciesTypeScript => {
  if (!expressionValue) {
    throw new Error(`Unsupported expression: ${expressionValue}`);
  }

  if ('evaluation' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TEvaluation,
      value: expressionValue,
    });
  }
  if ('classInstantiation' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TClassInstantiation,
      value: expressionValue,
    });
  }
  if ('struct' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TStructEvaluation,
      value: expressionValue,
    });
  }
  if ('backTickString' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TBackTickString,
      value: expressionValue,
    });
  }
  if (INDICATORS.EQUALITY_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TEqualityExpression,
      value: expressionValue,
    });
  }

  if (INDICATORS.ADDITIVE_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TAdditiveExpression,
      value: expressionValue,
    });
  }
  if (INDICATORS.LOGICAL_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TLogicalExpression,
      value: expressionValue,
    });
  }

  if (INDICATORS.RELATIONAL_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TRelationalExpression,
      value: expressionValue,
    });
  }

  if (INDICATORS.MULTIPLICATIVE_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TMultiplicativeExpression,
      value: expressionValue,
    });
  }
  if (INDICATORS.PARENTHESIZED_EXPRESSION in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TParenthesizedExpression,
      value: expressionValue,
    });
  }

  throw new Error(`Unsupported expression: ${expressionValue}`);
};

export { expressionValuesToTargetLanguage };
