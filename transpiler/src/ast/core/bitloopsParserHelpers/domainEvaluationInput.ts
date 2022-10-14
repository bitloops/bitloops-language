import { getNextTypesSubtree } from '../../utils/index.js';
import { getBitloopsModel } from '../BitloopsParser.js';

export const domainEvaluationInput = (subtree: any): any => {
  const fieldListTree = getNextTypesSubtree('evaluationFieldList', subtree);
  const regularEvaluationTree = getNextTypesSubtree('regularEvaluation', subtree);

  let props;
  if (fieldListTree) {
    props = getBitloopsModel(fieldListTree);
  } else if (regularEvaluationTree) {
    props = getBitloopsModel(regularEvaluationTree);
  } else {
    throw new Error('Entity evaluation must have properties!');
  }

  return props;
};
