import { getBitloopsModel } from '../BitloopsParser.js';
import { getNextTypesValue, getNextTypesSubtree } from '../../utils/index.js';

export const dtoEvaluation = (subtree: any): any => {
  const dtoEvaluationIdentifier = getNextTypesValue('dtoEvaluationIdentifier', subtree);
  const dtoEvaluationFieldTree = getNextTypesSubtree('evaluationFieldList', subtree);
  const fields = getBitloopsModel(dtoEvaluationFieldTree);

  return {
    dto: {
      name: dtoEvaluationIdentifier,
      fields,
    },
  };
};
