import { getNextTypesSubtree } from '../../utils/index.js';
import { getBitloopsModel, TSourceElementContext } from '../BitloopsParser.js';

const isSimpleReturnType = (returnType: string): boolean => {
  return typeof returnType === 'string';
};

const returnStatement = (subtree: any, contextSourceElement?: TSourceElementContext): any => {
  const expressionTree = getNextTypesSubtree('expression', subtree);

  const expression = getBitloopsModel(expressionTree);
  if (isSimpleReturnType(contextSourceElement?.returnType)) {
    return {
      return: expression,
    };
  }
  // TODO Use context return type to determine if we must return OK or Error
  // TODO get context with OK,Error return type (if exists) and return returnOK, returnError or simple return
  return {
    returnOK: expression,
  };
};

export { returnStatement };
