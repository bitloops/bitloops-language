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
  TArrayLiteralExpression,
  TExpression,
  TExpressionValues,
  TEvaluation,
  TIdentifierExpr,
} from './../../../../types.js';

export class ExpressionTypeIdentifiers {
  static isMethodCallExpression(expressionStatement: TExpression): boolean {
    const { expression } = expressionStatement;
    if (expression?.['evaluation']?.regularEvaluation?.type === 'method') {
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

  static isGetClassExpression(expressionStatement: TExpression): boolean {
    const { expression } = expressionStatement;

    if (expression?.['evaluation']?.getClass) {
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
}
