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
import { TExpression, TRegularCase, TStatement } from '../../../../../../../types.js';
import { StatementTypeIdentifiers } from '../../../../type-identifiers/statement.js';

const expressionUsesDependency = (value: TExpression): boolean => {
  const { expression } = value;
  if (
    expression?.['evaluation']?.regularEvaluation?.type === 'method' &&
    expression?.['evaluation']?.regularEvaluation?.value.startsWith('this.')
  ) {
    return true;
  }
  return false;
};

const prependAwaitToMethodCall = (value: TExpression): TExpression => {
  const { expression } = value;
  const methodValue = expression?.['evaluation']?.regularEvaluation?.value;
  expression['evaluation'].regularEvaluation.value = `await ${methodValue}`;
  return value;
};

const replaceUseCaseResultInExpression = (statement: TExpression): TExpression => {
  if (expressionUsesDependency(statement)) {
    return prependAwaitToMethodCall(statement);
  }
  return statement;
};

const scanStatementForDepsToPrependAwait = (statement: TStatement): TStatement => {
  if (StatementTypeIdentifiers.isExpression(statement)) {
    return replaceUseCaseResultInExpression(statement);
  }

  if (StatementTypeIdentifiers.isConstDeclaration(statement)) {
    const expression = statement.constDeclaration.expression;
    const newExpression = scanStatementForDepsToPrependAwait({ expression }) as TExpression;
    statement.constDeclaration.expression = newExpression.expression;
    return statement;
  }

  if (StatementTypeIdentifiers.isVariableDeclaration(statement)) {
    const expression = statement.variableDeclaration.expression;
    const newExpression = scanStatementForDepsToPrependAwait({ expression }) as TExpression;
    statement.variableDeclaration.expression = newExpression.expression;
    return statement;
  }

  if (StatementTypeIdentifiers.isIfStatement(statement)) {
    const { thenStatements, elseStatements } = statement.ifStatement;
    statement.ifStatement.thenStatements = thenStatements.map((st) =>
      scanStatementForDepsToPrependAwait(st),
    );
    if (!thenStatements) {
      return statement;
    }
    statement.ifStatement.elseStatements = elseStatements.map((st) =>
      scanStatementForDepsToPrependAwait(st),
    );
    return statement;
  }

  if (StatementTypeIdentifiers.isSwitchStatement(statement)) {
    const { cases, defaultCase } = statement.switchStatement;
    statement.switchStatement.cases = cases.map((switchCase: TRegularCase) => ({
      ...switchCase,
      statements: switchCase.statements.map((st) => scanStatementForDepsToPrependAwait(st)),
    }));
    statement.switchStatement.defaultCase.statements = defaultCase.statements.map((st) =>
      scanStatementForDepsToPrependAwait(st),
    );
    return statement;
  }

  // We don't need to prepend await, we can return the promise
  //   if (isReturnStatement(statement)) {
  //     const expression = statement.return;
  //     statement.return = replaceUseCaseResultInExpression(expression);
  //     return statement;
  //   }

  // Handle all other statement types
  return statement;
};

export { scanStatementForDepsToPrependAwait };
