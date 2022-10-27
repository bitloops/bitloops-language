import { getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const returnPrivateMethodType = (subtree: any): any => {
  const typeAnnotationTree = getNextTypesSubtree('typeAnnotation', subtree);
  const returnOkErrorTypeTree = getNextTypesSubtree('returnOkErrorType', subtree);

  let result;
  if (typeAnnotationTree) {
    const typeAnnotation = getBitloopsModel(typeAnnotationTree);
    result = {
      returnType: typeAnnotation.type,
    };
  } else if (returnOkErrorTypeTree) {
    const returnOkErrorType = getBitloopsModel(returnOkErrorTypeTree);
    result = {
      returnType: returnOkErrorType,
    };
  } else {
    throw new Error('Return type of private method must be typeAnnotation or okError');
  }

  return result;
};
