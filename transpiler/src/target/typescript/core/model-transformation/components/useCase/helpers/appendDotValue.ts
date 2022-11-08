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
  isExpressionAValueObjectEvaluation,
  isExpressionAnEntityEvaluation,
  isExpressionAVariableRegularEvaluation,
  isExpressionAMethodRegularEvaluation,
} from '../../../../../../../helpers/typeGuards.js';
import {
  TStatement,
  TExpression,
  TRegularCase,
  TConstDeclaration,
  TVariableDeclaration,
  TDomainEvaluation,
  TEvaluationFields,
  TArgumentDependency,
} from '../../../../../../../types.js';
import { StatementTypeIdentifiers } from '../../../../type-identifiers/statement.js';

const isVariableOrConstDeclarationWithDomainEvaluation = (
  statement: TStatement,
): statement is TConstDeclaration | TVariableDeclaration => {
  // TODO add check for variable declaration as well
  if (
    !StatementTypeIdentifiers.isConstDeclaration(statement) &&
    !StatementTypeIdentifiers.isVariableDeclaration(statement)
  ) {
    return false;
  }

  if (StatementTypeIdentifiers.isConstDeclaration(statement)) {
    const expression = statement.constDeclaration;
    return (
      isExpressionAValueObjectEvaluation(expression) || isExpressionAnEntityEvaluation(expression)
    );
  }
  const expression = statement.variableDeclaration;
  return (
    isExpressionAValueObjectEvaluation(expression) || isExpressionAnEntityEvaluation(expression)
  );
};

const getVariableOrConstDeclarationIdentifier = (
  statement: TConstDeclaration | TVariableDeclaration,
): string => {
  if (StatementTypeIdentifiers.isConstDeclaration(statement)) {
    return statement.constDeclaration.name;
  }
  if (StatementTypeIdentifiers.isVariableDeclaration(statement)) {
    return statement.variableDeclaration.name;
  }
  throw new Error('Statement is not constDeclaration or variableDeclaration');
};

// if (expression?.['evaluation']?.valueObject) {
const appendDotValueInDomainEvaluation = (
  domainEvaluation: TDomainEvaluation,
  identifiers: Set<string>,
): TDomainEvaluation => {
  const { props } = domainEvaluation;
  // if TEvaluationFields
  if (Array.isArray(props)) {
    domainEvaluation.props = (props as TEvaluationFields).map((prop) => {
      const { expression } = prop;
      return {
        ...prop,
        ...(scanStatementForIdentifierToAppendDotValue({ expression }, identifiers) as TExpression),
      };
    });
  }
  return domainEvaluation;
};

const appendDotValueInExpression = (
  statement: TExpression,
  identifiers: Set<string>,
): TExpression => {
  // Handle entity and object evaluation arguments, method calls arguments
  if (isExpressionAValueObjectEvaluation(statement)) {
    const newValueObject = appendDotValueInDomainEvaluation(
      statement.expression['evaluation'].valueObject,
      identifiers,
    );
    statement.expression['evaluation'].valueObject = newValueObject;
  } else if (isExpressionAnEntityEvaluation(statement)) {
    const domainEvaluation = appendDotValueInDomainEvaluation(
      statement.expression['evaluation'].entity,
      identifiers,
    );
    statement.expression['evaluation'].entity = domainEvaluation;
  } else if (isExpressionAVariableRegularEvaluation(statement)) {
    const value = statement.expression?.['evaluation']?.regularEvaluation?.value;
    if (identifiers.has(value)) {
      statement.expression['evaluation'].regularEvaluation.value = `${value}.value`;
    }
  } else if (isExpressionAMethodRegularEvaluation(statement)) {
    const { argumentDependencies } = statement.expression['evaluation'].regularEvaluation;
    if (argumentDependencies && argumentDependencies.length > 0) {
      const newArgs = argumentDependencies.map((arg: TArgumentDependency) => {
        const { value, type } = arg;
        if (type !== 'variable') {
          return arg;
        }
        if (identifiers.has(value)) {
          return {
            ...arg,
            value: `${value}.value`,
          };
        }
        return arg;
      });
      statement.expression['evaluation'].regularEvaluation.argumentDependencies = newArgs;
    }
  }

  return statement;
};

const scanStatementForIdentifierToAppendDotValue = (
  statement: TStatement,
  identifiers: Readonly<Set<string>>,
): TStatement => {
  if (StatementTypeIdentifiers.isExpression(statement)) {
    return appendDotValueInExpression(statement, identifiers);
  }

  if (StatementTypeIdentifiers.isConstDeclaration(statement)) {
    const expression = statement.constDeclaration.expression;
    const newExpression = scanStatementForIdentifierToAppendDotValue(
      { expression },
      identifiers,
    ) as TExpression;
    statement.constDeclaration.expression = newExpression.expression;
    return statement;
  }

  // TODO Abstract this code replication
  if (StatementTypeIdentifiers.isIfStatement(statement)) {
    const { thenStatements, elseStatements } = statement.ifStatement;
    statement.ifStatement.thenStatements = thenStatements.map((st) =>
      scanStatementForIdentifierToAppendDotValue(st, identifiers),
    );
    if (!elseStatements) {
      return statement;
    }
    if (statement.ifStatement.elseStatements?.length > 0) {
      statement.ifStatement.elseStatements = elseStatements.map((st) =>
        scanStatementForIdentifierToAppendDotValue(st, identifiers),
      );
    }

    return statement;
  }

  if (StatementTypeIdentifiers.isSwitchStatement(statement)) {
    const { cases, defaultCase } = statement.switchStatement;
    statement.switchStatement.cases = cases.map((switchCase: TRegularCase) => ({
      ...switchCase,
      statements: switchCase.statements.map((st) =>
        scanStatementForIdentifierToAppendDotValue(st, identifiers),
      ),
    }));
    statement.switchStatement.defaultCase.statements = defaultCase.statements.map((st) =>
      scanStatementForIdentifierToAppendDotValue(st, identifiers),
    );
    return statement;
  }

  return statement;
};
export {
  isVariableOrConstDeclarationWithDomainEvaluation,
  getVariableOrConstDeclarationIdentifier,
  scanStatementForIdentifierToAppendDotValue,
};
