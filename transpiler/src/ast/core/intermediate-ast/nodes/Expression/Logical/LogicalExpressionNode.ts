import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ExpressionNode } from '../ExpressionNode.js';

export class LogicalExpressionNode extends ExpressionNode {
  private static NAME = 'logicalExpression';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = LogicalExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TLogicalExpression;
  }
}
