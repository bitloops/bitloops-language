import { getBitloopsModel } from '../BitloopsParser.js';
import { getNextTypesSubtree } from '../../utils/index.js';

export const regularDTOEvaluation = (subtree: any): any => {
  let value = subtree.value;
  const dtoTree = getNextTypesSubtree('dtoEvaluation', subtree);
  if (dtoTree) {
    value = getBitloopsModel(dtoTree);
  }
  return { type: 'dto', value: value };
};
