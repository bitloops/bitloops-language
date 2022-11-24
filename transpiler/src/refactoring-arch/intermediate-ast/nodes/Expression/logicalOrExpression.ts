import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';
export class LogicalOrExpressionNode extends ExpressionNode {
  private static NAME = 'orExpression';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = LogicalOrExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TOrExpression;
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
