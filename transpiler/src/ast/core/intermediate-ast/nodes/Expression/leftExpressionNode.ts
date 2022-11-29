import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

export class LeftExpressionNode extends ExpressionNode {
  private static NAME = 'left';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = LeftExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TExpression;
  }
}
