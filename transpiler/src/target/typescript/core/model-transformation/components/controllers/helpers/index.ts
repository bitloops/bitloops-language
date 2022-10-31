// import { isConstDeclaration } from '../../../../../../../helpers/typeGuards.js';
// import { TConstDeclaration } from './../../../../../../../types.js';

const isUseCaseExecuteStatement = (_value: any): boolean => {
  return false;

  //   if (!isConstDeclaration(value)) {
  //     return false;
  //   }
  //   if (isUseCaseExecuteStatement2(value)) {
  //     return true;
  //   }
};

// const isUseCaseExecuteStatement2 = (value: TConstDeclaration): boolean => {
//   const { expression } = value.constDeclaration;
//   if (
//     expression?.['evaluation']?.regularEvaluation?.type === 'method' &&
//     expression?.['evaluation']?.regularEvaluation?.value.startsWith('this.') &&
//     expression?.['evaluation']?.regularEvaluation?.value.endsWith('.execute')
//   ) {
//     return true;
//   }
//   return false;
// };

export { isUseCaseExecuteStatement };
