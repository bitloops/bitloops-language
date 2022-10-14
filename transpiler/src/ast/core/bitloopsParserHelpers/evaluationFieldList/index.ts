import { getNextTypesSubtree } from '../../../utils/index.js';
import { getBitloopsModel } from '../../BitloopsParser.js';

export const evaluationFieldList = (subtree: any) => {
  const fields = [];
  const evaluationFieldList = subtree.children;
  evaluationFieldList.forEach((element) => {
    const evaluationFieldTree = getNextTypesSubtree('evaluationField', element);
    if (evaluationFieldTree) {
      const field = getBitloopsModel(evaluationFieldTree);
      fields.push(field);
    }
  });
  return fields;
};
