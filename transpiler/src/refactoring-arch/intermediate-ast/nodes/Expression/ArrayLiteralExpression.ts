import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'ArrayLiteralExpression';
export class ArrayLiteralExpressionNode extends ExpressionNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TThisExpression, { lines: lines! }, NAME);
  }
}
