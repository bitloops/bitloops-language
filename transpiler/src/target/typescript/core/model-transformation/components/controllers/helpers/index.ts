import { isConstDeclaration } from '../../../../../../../helpers/typeGuards.js';
import { deepClone } from '../../../../../../../utils/deepClone.js';
import { TConstDeclaration, TStatement } from './../../../../../../../types.js';

const isUseCaseExecuteStatement = (value: TStatement): value is TConstDeclaration => {
  if (!isConstDeclaration(value)) {
    return false;
  }
  if (isUseCaseExecuteConstDeclaration(value)) {
    return true;
  }

  return false;
};

const isUseCaseExecuteConstDeclaration = (value: TConstDeclaration): boolean => {
  const { expression } = value.constDeclaration;
  if (
    expression?.['evaluation']?.regularEvaluation?.type === 'method' &&
    expression?.['evaluation']?.regularEvaluation?.value.startsWith('this.') &&
    expression?.['evaluation']?.regularEvaluation?.value.endsWith('.execute')
  ) {
    return true;
  }
  return false;
};
const prependAwaitToExecute = (_value: TConstDeclaration): TConstDeclaration => {
  const value = deepClone(_value);
  const { expression } = value.constDeclaration;
  const methodValue = expression?.['evaluation']?.regularEvaluation?.value;
  expression['evaluation'].regularEvaluation.value = `await ${methodValue}`;
  return value;
};

export { isUseCaseExecuteStatement, prependAwaitToExecute };
