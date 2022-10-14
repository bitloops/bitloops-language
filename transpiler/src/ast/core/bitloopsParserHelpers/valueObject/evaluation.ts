import { getNextTypesValue, getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const valueObjectEvaluation = (subtree: any): any => {
  const voIdentifierName = getNextTypesValue('valueObjectIdentifier', subtree);

  const domainEvaluationInputTree = getNextTypesSubtree('domainEvaluationInput', subtree);
  const props = getBitloopsModel(domainEvaluationInputTree);

  return {
    valueObject: {
      props,
      name: voIdentifierName,
    },
  };
};
