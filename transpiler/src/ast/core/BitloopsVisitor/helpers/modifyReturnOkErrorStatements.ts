import {
  TStatement,
  TOkErrorReturnType,
  TStatements,
  TReturnStatement,
} from '../../../../types.js';

const isReturnStatement = (statement: TStatement): boolean => {
  return (statement as TReturnStatement).return !== undefined;
};

const isReturnOKStatement = (statement: TStatement): boolean => {
  return statement !== undefined;
};

const isReturnErrorStatement = (statement: TStatement): boolean => {
  return statement !== undefined;
};

const isReturnOkErrorType = (statement: TReturnStatement, returnType): boolean => {
  console.log('isReturnOkErrorType statement', statement.return.expression);
  console.log('isReturnOkErrorType returnType', returnType);
  return true;
};

export const modifyReturnOkErrorStatements = (
  statements: TStatements,
  returnType: TOkErrorReturnType,
) => {
  return statements.map((statement) => {
    if (isReturnStatement(statement)) {
      console.log('isReturnStatement statement', statement);
      console.log('returnType', returnType);
      const returnStatement = statement as TReturnStatement;
      if (isReturnOkErrorType(returnStatement, returnType)) {
        if (isReturnOKStatement(statement)) {
          statement = {
            returnOK: returnStatement.return,
          };
        } else if (isReturnErrorStatement(statement)) {
          statement = {
            returnError: returnStatement.return,
          };
        }
        console.log('changed statement', statement);
      }
    }
    return statement;
  });
};
