import { expressionKey, TEvaluationFields, TExpression } from '../../../types.js';

export class NodeValueHelpers {
  static findKeyOfEvaluationFieldList(list: TEvaluationFields, key: string): TExpression {
    const result = list.fields.find(({ evaluationField }) => evaluationField.identifier === key);
    if (!result) throw new Error('Key not found in evaluation field list: ' + key);
    const expression = result.evaluationField[expressionKey];
    return { expression };
  }
}
