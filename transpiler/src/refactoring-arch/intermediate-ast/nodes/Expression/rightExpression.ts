import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

export class RightExpressionNode extends ExpressionNode {
  private static NAME = 'right';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = RightExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TExpression;
  }
}
