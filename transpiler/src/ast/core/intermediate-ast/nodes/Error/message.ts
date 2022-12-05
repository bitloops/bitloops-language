import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ErrorMessageNode extends ExpressionNode {
  private static NAME = 'message';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = ErrorMessageNode.NAME;
    this.nodeType = BitloopsTypesMapping.TExpression;
  }
}
