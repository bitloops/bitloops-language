import { TGetClass } from './../../../../types';
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

import { INDICATORS } from '../components/statements/expression/expressionValues.js';
import {
  TArrayLiteralExpression,
  TExpression,
  TExpressionValues,
  TEvaluation,
  TIdentifierExpr,
  TLiteral,
  TAssignmentExpression,
  TThisExpression,
  TInstanceOf,
  TParenthesizedExpression,
  TMemberDotExpression,
  TToStringExpression,
} from './../../../../types.js';

export class ExpressionTypeIdentifiers {
  static isMethodCallExpression(expressionStatement: TExpression): boolean {
    const { expression } = expressionStatement;
    if (expression?.['evaluation']?.regularEvaluation?.type === 'method') {
      return true;
    }
    return false;
  }

  static isAssignmentExpression(
    expressionValue: TExpressionValues,
  ): expressionValue is TAssignmentExpression {
    if ('assignmentExpression' in expressionValue) {
      return true;
    }
    return false;
  }
  static isIdentifierExpression = (
    expressionValue: TExpressionValues,
  ): expressionValue is TIdentifierExpr => {
    if ('identifier' in expressionValue) {
      return true;
    }
    return false;
  };

  // static isGetClassExpression(expressionStatement: TExpression): boolean {
  //   const { expression } = expressionStatement;

  //   if (expression?.['evaluation']?.getClass) {
  //     return true;
  //   }
  //   return false;
  // }

  static isLiteralExpression(expressionValue: TExpressionValues): expressionValue is TLiteral {
    if ('literal' in expressionValue) {
      return true;
    }
    return false;
  }

  static isArrayLiteralExpression = (
    expressionValue: TExpressionValues,
  ): expressionValue is TArrayLiteralExpression => {
    if ('arrayLiteral' in expressionValue) {
      return true;
    }
    return false;
  };

  static isEvaluationExpression = (
    expressionValue: TExpressionValues,
  ): expressionValue is TEvaluation => {
    if ('evaluation' in expressionValue) {
      return true;
    }
    return false;
  };

  static isThisExpression = (
    expressionValue: TExpressionValues,
  ): expressionValue is TThisExpression => {
    if ('thisExpression' in expressionValue) {
      return true;
    }
    return false;
  };

  static isInstanceOfExpression = (
    expressionValue: TExpressionValues,
  ): expressionValue is TInstanceOf => {
    if ('isInstanceOf' in expressionValue) {
      return true;
    }
    return false;
  };

  static isParenthesizedExpression = (
    expressionValue: TExpressionValues,
  ): expressionValue is TParenthesizedExpression => {
    if (INDICATORS.PARENTHESIZED_EXPRESSION in expressionValue) {
      return true;
    }
    return false;
  };

  static isMemberDotExpression(
    expressionValue: TExpressionValues,
  ): expressionValue is TMemberDotExpression {
    if ('memberDotExpression' in expressionValue) {
      return true;
    }
    return false;
  }

  static isToStringExpression(
    expressionValue: TExpressionValues,
  ): expressionValue is TToStringExpression {
    if ('toStringMethod' in expressionValue) {
      return true;
    }
    return false;
  }

  static isGetClassExpression(expressionValue: TExpressionValues): expressionValue is TGetClass {
    if ('getClass' in expressionValue) {
      return true;
    }
    return false;
  }
}
