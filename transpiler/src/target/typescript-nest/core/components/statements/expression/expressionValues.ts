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
import { evaluationToTargetLanguage } from './evaluation/index.js';
import { ExpressionTypeIdentifiers } from './../../../type-identifiers/expression.js';
import { literalExpressionToTargetLanguage } from './literalExpression.js';
import { identifierExpressionToTargetLanguage } from './identifier.js';

export { evaluationToTargetLanguage };

export enum INDICATORS {
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
    throw new Error(`Unsupported expression: ${JSON.stringify(expressionValue)}`);
  }

  if ('evaluation' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TEvaluation,
      value: expressionValue,
    });
  }

  if (ExpressionTypeIdentifiers.isLiteralExpression(expressionValue)) {
    return literalExpressionToTargetLanguage(expressionValue);
  }

  if (ExpressionTypeIdentifiers.isIdentifierExpression(expressionValue)) {
    return identifierExpressionToTargetLanguage(expressionValue);
  }

  if (ExpressionTypeIdentifiers.isArrayLiteralExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TArrayLiteralExpression,
      value: expressionValue,
    });
  }
  if (ExpressionTypeIdentifiers.isAssignmentExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TAssignmentExpression,
      value: expressionValue,
    });
  }

  if (ExpressionTypeIdentifiers.isThisExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TThisExpression,
      value: expressionValue,
    });
  }

  if (ExpressionTypeIdentifiers.isInstanceOfExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TInstanceOf,
      value: expressionValue,
    });
  }

  if (ExpressionTypeIdentifiers.isMemberDotExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TMemberDotExpression,
      value: expressionValue,
    });
  }
  if (ExpressionTypeIdentifiers.isGetClassExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TGetClass,
      value: expressionValue,
    });
  }

  if (ExpressionTypeIdentifiers.isToStringExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TToStringExpression,
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
  if (ExpressionTypeIdentifiers.isParenthesizedExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TParenthesizedExpression,
      value: expressionValue,
    });
  }

  if (ExpressionTypeIdentifiers.isMethodCallExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TMethodCallExpression,
      value: expressionValue,
    });
  }
  if ('toStringMethod' in expressionValue) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TToStringExpression,
      value: expressionValue,
    });
  }

  if (ExpressionTypeIdentifiers.isEnvironmentVariableExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TEnvironmentVariableExpression,
      value: expressionValue,
    });
  }

  if (ExpressionTypeIdentifiers.isIfErrorExpression(expressionValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TIfErrorExpression,
      value: expressionValue,
    });
  }

  throw new Error(`Unsupported expression: ${JSON.stringify(expressionValue)}`);
};

export { expressionValuesToTargetLanguage };
