import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'AdditiveExpression';
// This would extend the ExpressionNode class instead
export class AdditiveExpressionNode extends ExpressionNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TAdditiveExpression, { lines: lines! }, NAME);
  }

  getExpressions(num: 0 | 1 | null): ExpressionNode | ExpressionNode[] {
    if (num === null) {
      return this.getChildren() as ExpressionNode[];
    }
    return this.getChildren()[num] as ExpressionNode;
  }
}
