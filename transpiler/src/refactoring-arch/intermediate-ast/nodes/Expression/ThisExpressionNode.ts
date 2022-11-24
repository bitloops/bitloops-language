import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

export class ThisExpressionNode extends ExpressionNode {
  private static NAME = 'thisExpression';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = ThisExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TThisExpression;
  }
}
