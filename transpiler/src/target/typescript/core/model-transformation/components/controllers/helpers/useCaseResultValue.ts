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
  isExpression,
  isIfStatement,
  isSwitchStatement,
  isReturnStatement,
} from '../../../../../../../helpers/typeGuards.js';
import { deepClone } from '../../../../../../../utils/deepClone.js';
import { ExpressionTypeIdentifiers } from '../../../../type-identifiers/expression.js';
import { TArgument, TStatement, TExpression, TRegularCase } from './../../../../../../../types.js';

const replaceUseCaseResultInExpression = (
  statement: TExpression,
  useCaseResultIdentifier: string,
): TExpression => {
  const { expression } = statement;

  if (ExpressionTypeIdentifiers.isMethodCallExpression(statement)) {
    const newArgs = expression['evaluation'].regularEvaluation.argumentDependencies?.map(
      (arg: TArgument) => {
        if (arg.value.includes(useCaseResultIdentifier)) {
          return {
            ...arg,
            value: arg.value.replace(useCaseResultIdentifier, `${useCaseResultIdentifier}.value`),
          };
        }
        return arg;
      },
    );
    expression['evaluation'].regularEvaluation.argumentDependencies = newArgs;
  } else if (ExpressionTypeIdentifiers.isGetClassExpression(statement)) {
    const previousValue = expression['evaluation'].getClass.regularEvaluation.value;

    if (previousValue.includes(useCaseResultIdentifier)) {
      expression['evaluation'].getClass.regularEvaluation.value = `${previousValue}.value`;
    }
  }
  return statement;
};

const scanStatementForUseCaseResult = (
  _statement: TStatement,
  useCaseResultIdentifier: string,
): TStatement => {
  const statement = deepClone(_statement);
  if (isExpression(statement)) {
    return replaceUseCaseResultInExpression(statement, useCaseResultIdentifier);
  }

  if (isIfStatement(statement)) {
    const { thenStatements, elseStatements } = statement.ifStatement;
    statement.ifStatement.thenStatements = thenStatements.map((st) =>
      scanStatementForUseCaseResult(st, useCaseResultIdentifier),
    );
    if (!elseStatements) {
      return statement;
    }
    statement.ifStatement.elseStatements = elseStatements.map((st) =>
      scanStatementForUseCaseResult(st, useCaseResultIdentifier),
    );
    return statement;
  }

  if (isSwitchStatement(statement)) {
    const { cases, defaultCase, expression } = statement.switchStatement;
    statement.switchStatement.expression = (
      scanStatementForUseCaseResult({ expression }, useCaseResultIdentifier) as TExpression
    ).expression;

    statement.switchStatement.cases = cases.map((switchCase: TRegularCase) => ({
      ...switchCase,
      statements: switchCase.statements.map((st) =>
        scanStatementForUseCaseResult(st, useCaseResultIdentifier),
      ),
    }));
    statement.switchStatement.defaultCase.statements = defaultCase.statements.map((st) =>
      scanStatementForUseCaseResult(st, useCaseResultIdentifier),
    );
    return statement;
  }

  if (isReturnStatement(statement)) {
    const expression = statement.return;
    statement.return = replaceUseCaseResultInExpression(expression, useCaseResultIdentifier);
    return statement;
  }

  // Handle all other statement types
  return statement;
};

export { scanStatementForUseCaseResult };
