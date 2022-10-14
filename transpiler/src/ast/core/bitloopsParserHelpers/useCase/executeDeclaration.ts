import { getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

const useCaseExecuteDeclaration = (subtree: any): any => {
  const parameterTree = getNextTypesSubtree('formalParameterList', subtree);
  const returnTree = getNextTypesSubtree('returnOkErrorType', subtree);
  const functionTree = getNextTypesSubtree('functionBody', subtree);

  const parameterList = getBitloopsModel(parameterTree);
  const returnOkErrorType = getBitloopsModel(returnTree);
  const functionBody = getBitloopsModel(functionTree);

  return {
    returnTypes: returnOkErrorType,
    execute: {
      parameterDependencies: parameterList,
      ...functionBody,
    },
  };
};

export { useCaseExecuteDeclaration };
