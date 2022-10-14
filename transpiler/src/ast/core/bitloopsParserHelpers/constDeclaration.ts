import { getNextTypesSubtree } from '../../utils/index.js';
import { getBitloopsModel } from '../BitloopsParser.js';

export const constDeclaration = (subtree: any): any => {
  const identifierTree = getNextTypesSubtree('identifier', subtree);
  const identifier = getBitloopsModel(identifierTree);
  const expressionTree = getNextTypesSubtree('expression', subtree);
  const expression = getBitloopsModel(expressionTree);
  const typeAnnotationTree = getNextTypesSubtree('typeAnnotation', subtree);

  const result = {
    constDeclaration: {
      name: identifier.value,
      ...expression,
    },
  };
  if (typeAnnotationTree) {
    const typeAnnotation = getBitloopsModel(typeAnnotationTree);
    result.constDeclaration.type = typeAnnotation.type;
  }

  console.log('result', result);
  return result;
};
