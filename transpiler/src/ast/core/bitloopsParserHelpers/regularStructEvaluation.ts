import { getBitloopsModel } from '../BitloopsParser.js';
import { getNextTypesSubtree } from '../../utils/index.js';

export const regularStructEvaluation = (subtree: any): any => {
  let value = subtree.value;
  const structTree = getNextTypesSubtree('structEvaluation', subtree);
  if (structTree) {
    value = getBitloopsModel(structTree);
  }
  return { type: 'struct', value };
};
