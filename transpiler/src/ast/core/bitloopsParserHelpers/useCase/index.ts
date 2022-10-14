import { getNextTypesChildren, getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

const useCaseDeclaration = (subtree: any): any => {
  const useCaseIdentifier = getNextTypesChildren('useCaseIdentifier', subtree);
  const useCaseName = useCaseIdentifier[0].value;
  const parameterTree = getNextTypesSubtree('formalParameterList', subtree);
  const executeTree = getNextTypesSubtree('useCaseExecuteDeclaration', subtree);

  const parameterList = getBitloopsModel(parameterTree);
  const executeDeclaration = getBitloopsModel(executeTree);

  return {
    key: useCaseName,
    subModel: {
      parameterDependencies: parameterList,
      returnTypes: executeDeclaration.returnTypes,
      execute: executeDeclaration.execute,
    },
  };
};

export { useCaseDeclaration };
