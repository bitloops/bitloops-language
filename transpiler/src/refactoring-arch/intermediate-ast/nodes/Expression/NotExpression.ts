import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'NotExpression';
// This would extend the ExpressionNode class instead
export class NotExpressionNode extends ExpressionNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TNotExpression, { lines: lines! }, NAME);
  }

  // 🔧 TODO: Add a method to get the child node
  // getExpression(): ExpressionNode {
  //   const children = this.getChildren();
  //   const expression = children.find((child) => child instanceof ExpressionNode);
  //   return expression
  // }
}
