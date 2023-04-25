import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

export class IfErrorExpressionNode extends ExpressionNode {
  private static NAME = 'ifErrorExpression';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = IfErrorExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TIfErrorExpression;
  }
}
