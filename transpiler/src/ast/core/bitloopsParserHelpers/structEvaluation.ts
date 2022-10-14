import { getNextTypesSubtree, getNextTypesValue } from '../../utils/index.js';
import { getBitloopsModel } from '../BitloopsParser.js';

export const structEvaluation = (subtree: any): any => {
  const structIdentifierName = getNextTypesValue('structEvaluationIdentifier', subtree);

  const structEvaluationFieldTree = getNextTypesSubtree('evaluationFieldList', subtree);
  const fields = getBitloopsModel(structEvaluationFieldTree);

  return {
    struct: {
      name: structIdentifierName,
      fields,
    },
  };
};
