import { getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

//TODO rename to domain create
const domainConstructorDeclaration = (subtree: any): any => {
  const parameterTree = getNextTypesSubtree('formalParameterList', subtree);
  const returnTree = getNextTypesSubtree('returnOkErrorType', subtree);
  const functionTree = getNextTypesSubtree('functionBody', subtree);

  const parameterList = getBitloopsModel(parameterTree);
  const returnOkErrorType = getBitloopsModel(returnTree);

  const functionBody = getBitloopsModel(functionTree);

  return {
    create: {
      returnType: returnOkErrorType,
      parameterDependency: parameterList,
      ...functionBody,
    },
  };
};

export { domainConstructorDeclaration };
