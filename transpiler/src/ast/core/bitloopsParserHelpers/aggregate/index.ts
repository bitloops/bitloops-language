import { getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const aggregateDeclaration = (subtree: any): any => {
  const rootEntityTree = getNextTypesSubtree('entityDeclaration', subtree);
  const rootEntity = getBitloopsModel(rootEntityTree);

  return rootEntity.classModel;
};
