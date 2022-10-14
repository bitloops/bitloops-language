import { getNextTypesValue, getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const entityEvaluation = (subtree: any): any => {
  const entityIdentifierName = getNextTypesValue('entityIdentifier', subtree);

  const domainEvaluationInputTree = getNextTypesSubtree('domainEvaluationInput', subtree);
  const props = getBitloopsModel(domainEvaluationInputTree);

  return {
    entity: {
      props,
      name: entityIdentifierName,
    },
  };
};
