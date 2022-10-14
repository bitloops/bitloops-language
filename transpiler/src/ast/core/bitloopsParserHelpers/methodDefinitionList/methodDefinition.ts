import { getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const methodDefinition = (subtree: any): any => {
  const identifierTree = getNextTypesSubtree('identifier', subtree);
  const identifier = getBitloopsModel(identifierTree);
  const formalParameterListTree = getNextTypesSubtree('formalParameterList', subtree);
  const formalParameterList = getBitloopsModel(formalParameterListTree);
  const typeAnnotationTree = subtree.children[2];
  const typeAnnotation = getBitloopsModel(typeAnnotationTree);

  const result = {
    [identifier.value]: {
      parameterDependencies: formalParameterList,
      returnType: typeAnnotation.type,
    },
  };
  return result;
};
