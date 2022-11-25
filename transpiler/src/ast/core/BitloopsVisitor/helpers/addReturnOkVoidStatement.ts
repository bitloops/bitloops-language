import { bitloopsPrimitives } from '../../../../helpers/bitloopsPrimitiveToLang.js';
import { returnOKKey, TOkErrorReturnType, TStatements } from '../../../../types.js';

const returnOkVoidStatement = {
  returnOK: { expression: { evaluation: { regularEvaluation: { type: 'void', value: '' } } } },
};

export const addReturnOkVoidStatement = (
  statements: TStatements,
  returnType: TOkErrorReturnType,
) => {
  if (returnType.ok === bitloopsPrimitives.void) {
    const lastStatement = statements[statements.length - 1];
    if (lastStatement) {
      const lastStatementKey = Object.keys(lastStatement)[0];
      if (lastStatementKey !== returnOKKey) {
        statements.push(returnOkVoidStatement);
      }
    } else {
      statements.push(returnOkVoidStatement);
    }
  }
};
