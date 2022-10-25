import { TUseCaseValues } from '../../../../types.js';
import { getNextTypesChildren, getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';
import { addReturnOkVoidStatement } from '../../BitloopsVisitor/helpers/addReturnOkVoidStatement.js';

const useCaseDeclaration = (subtree: any): any => {
  const useCaseIdentifier = getNextTypesChildren('useCaseIdentifier', subtree);
  const useCaseName = useCaseIdentifier[0].value;
  const parameterTree = getNextTypesSubtree('formalParameterList', subtree);
  const executeTree = getNextTypesSubtree('useCaseExecuteDeclaration', subtree);

  const parameterList = getBitloopsModel(parameterTree);
  const executeDeclaration: TUseCaseValues = getBitloopsModel(executeTree);
  const { execute, returnTypes } = executeDeclaration;
  const { statements } = execute;

  addReturnOkVoidStatement(statements, returnTypes);

  return {
    key: useCaseName,
    subModel: {
      parameterDependencies: parameterList,
      returnTypes,
      execute,
    },
  };
};

export { useCaseDeclaration };
