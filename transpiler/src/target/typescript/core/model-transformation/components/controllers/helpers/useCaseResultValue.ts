import {
  isExpression,
  isIfStatement,
  isSwitchStatement,
  isReturnStatement,
} from '../../../../../../../helpers/typeGuards.js';
import { deepClone } from '../../../../../../../utils/deepClone.js';
import {
  TArgumentDependency,
  TStatement,
  TExpression,
  TRegularCase,
} from './../../../../../../../types.js';

const replaceUseCaseResultInExpression = (
  statement: TExpression,
  useCaseResultIdentifier: string,
): TExpression => {
  const { expression } = statement;

  if (expression?.['evaluation']?.regularEvaluation?.type === 'method') {
    const newArgs = expression['evaluation'].regularEvaluation.argumentDependencies?.map(
      (arg: TArgumentDependency) => {
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
    if (!thenStatements) {
      return statement;
    }
    statement.ifStatement.elseStatements = elseStatements.map((st) =>
      scanStatementForUseCaseResult(st, useCaseResultIdentifier),
    );
    return statement;
  }

  if (isSwitchStatement(statement)) {
    const { cases, defaultCase } = statement.switchStatement;
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
