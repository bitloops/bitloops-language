import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

// This would extend the ExpressionNode class instead
export class AdditiveExpressionNode extends ExpressionNode {
  private static NAME = 'additiveExpression';
  // constructor(lines?: string) {
  //   super(BitloopsTypesMapping.TAdditiveExpression, { lines: lines! }, NAME);
  // }

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = AdditiveExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TAdditiveExpression;
  }

  /* 🔧 TODO: implement left and right getters */
  getExpressions(num: 0 | 1 | null): ExpressionNode | ExpressionNode[] {
    const expressions = this.getChildren().filter((child) => child instanceof ExpressionNode);
    if (num === null) {
      return expressions as ExpressionNode[];
    }
    return expressions[num] as ExpressionNode;
  }
}
