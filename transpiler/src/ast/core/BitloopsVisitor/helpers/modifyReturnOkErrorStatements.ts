import {
  TStatement,
  TOkErrorReturnType,
  TStatements,
  TReturnStatement,
  TRegularEvaluation,
  TEvaluation,
} from '../../../../types.js';

const DOMAIN_ERRORS_PREFIX = 'DomainErrors';
const APPLICATION_ERRORS_PREFIX = 'ApplicationErrors';

const isReturnOkErrorType = (returnType: TOkErrorReturnType) => {
  return returnType.ok !== undefined && returnType.errors !== undefined;
};

const isReturnStatement = (statement: TStatement): boolean => {
  return (statement as TReturnStatement).return !== undefined;
};

const isReturnOKStatement = (statement: TReturnStatement): boolean => {
  return !isReturnErrorStatement(statement);
};

const isReturnErrorStatement = (statement: TReturnStatement): boolean => {
  const returnEvaluation = (statement.return.expression as TEvaluation).evaluation;

  const returnEvaluationValue = (returnEvaluation as TRegularEvaluation)?.regularEvaluation?.value;
  //If not regular Evaluation it is not error
  if (returnEvaluationValue === undefined) return false;

  return (
    returnEvaluationValue.includes(DOMAIN_ERRORS_PREFIX) ||
    returnEvaluationValue.includes(APPLICATION_ERRORS_PREFIX)
  );
};

export const modifyReturnOkErrorStatements = (
  statements: TStatements,
  returnType: TOkErrorReturnType,
) => {
  return statements.map((statement) => {
    if (isReturnStatement(statement)) {
      const returnStatement = statement as TReturnStatement;
      if (isReturnOkErrorType(returnType)) {
        if (isReturnOKStatement(returnStatement)) {
          statement = {
            returnOK: returnStatement.return,
          };
        } else if (isReturnErrorStatement(returnStatement)) {
          statement = {
            returnError: returnStatement.return,
          };
        }
      }
    }
    return statement;
  });
};
