import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'MultiplicativeExpression';
// This would extend the ExpressionNode class instead
export class MultiplicativeExpressionNode extends ExpressionNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TMultiplicativeExpression, { lines: lines! }, NAME);
  }

  /* 🔧 TODO: make a Base class for left Right expressions and paste this  */
  getExpressions(num: 0 | 1 | null): ExpressionNode | ExpressionNode[] {
    if (num === null) {
      return this.getChildren() as ExpressionNode[];
    }
    return this.getChildren()[num] as ExpressionNode;
  }
}
