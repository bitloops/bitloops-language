import { getNextTypesChildren, getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const publicMethodDeclaration = (subtree: any): any => {
  const identifier = getNextTypesChildren('identifier', subtree);
  const identifierName = identifier[0]?.value;

  const parametersTree = getNextTypesSubtree('formalParameterList', subtree);
  const parameters = getBitloopsModel(parametersTree);
  const returnMethodTypeAnnotationTree = getNextTypesSubtree('returnPublicMethodType', subtree);
  const returnMethodTypeAnnotation = getBitloopsModel(returnMethodTypeAnnotationTree);
  const functionBodyTree = getNextTypesSubtree('functionBody', subtree);
  const functionBody = getBitloopsModel(functionBodyTree);

  return {
    [identifierName]: {
      publicMethod: {
        parameterDependencies: parameters,
        ...functionBody,
        ...returnMethodTypeAnnotation,
      },
    },
  };
};
