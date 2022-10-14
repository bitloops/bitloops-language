import { getNextTypesSubtree, getNextTypesValue } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const evaluationField = (subtree: any) => {
  const fieldName = getNextTypesValue('LEAF', subtree);
  const expressionTree = getNextTypesSubtree('expression', subtree);
  const expression = getBitloopsModel(expressionTree);

  return {
    name: fieldName,
    ...expression,
  };
};
