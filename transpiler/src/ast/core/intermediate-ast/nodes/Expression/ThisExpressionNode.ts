import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

export class ThisExpressionNode extends ExpressionNode {
  private static nodeName = 'thisExpression';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = ThisExpressionNode.nodeName;
    this.nodeType = BitloopsTypesMapping.TThisExpression;
  }
}
