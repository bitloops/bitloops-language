import { bitloopsPrimitives } from '../../../../helpers/bitloopsPrimitiveToLang.js';
import { TUseCaseValues } from '../../../../types.js';
import { getNextTypesChildren, getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';
import { returnOkVoidStatement } from '../../BitloopsVisitor/helpers/specificStatementModels.js';

const useCaseDeclaration = (subtree: any): any => {
  const useCaseIdentifier = getNextTypesChildren('useCaseIdentifier', subtree);
  const useCaseName = useCaseIdentifier[0].value;
  const parameterTree = getNextTypesSubtree('formalParameterList', subtree);
  const executeTree = getNextTypesSubtree('useCaseExecuteDeclaration', subtree);

  const parameterList = getBitloopsModel(parameterTree);
  const executeDeclaration: TUseCaseValues = getBitloopsModel(executeTree);
  const { execute, returnTypes } = executeDeclaration;
  const { statements } = execute;
  if (returnTypes.ok === bitloopsPrimitives.void) {
    const lastElement = statements[statements.length - 1];
    if (Object.keys(lastElement)[0] === 'returnOK') {
      console.log('here');
    }
    statements.push(returnOkVoidStatement);
  }

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
