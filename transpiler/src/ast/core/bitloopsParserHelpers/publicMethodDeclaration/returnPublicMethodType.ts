import { getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const returnPublicMethodType = (subtree: any): any => {
  const returnOkErrorTypeTree = getNextTypesSubtree('returnOkErrorType', subtree);

  let result;
  if (returnOkErrorTypeTree) {
    const returnOkErrorType = getBitloopsModel(returnOkErrorTypeTree);
    console.log('returnOkErrorType publicMethod', returnOkErrorType);
    result = {
      returnType: returnOkErrorType,
    };
  } else {
    throw new Error('Return type of public method must be okError');
  }

  return result;
};
