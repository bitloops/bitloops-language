import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

// This would extend the ExpressionNode class instead
export class MultiplicativeExpressionNode extends ExpressionNode {
  private static NAME = 'multiplicativeExpression';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = MultiplicativeExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TMultiplicativeExpression;
  }

  /* 🔧 TODO: make a Base class for left Right expressions and paste this  */
  getExpressions(num: 0 | 1 | null): ExpressionNode | ExpressionNode[] {
    const expressions = this.getChildren().filter((child) => child instanceof ExpressionNode);
    if (num === null) {
      return expressions as ExpressionNode[];
    }
    return expressions[num] as ExpressionNode;
  }
}
