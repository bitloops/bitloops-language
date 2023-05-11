import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { LogicalExpressionNode } from './LogicalExpressionNode.js';

const NAME = 'notExpression';
export class LogicalNotExpressionNode extends LogicalExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = NAME;
    this.nodeType = BitloopsTypesMapping.TNotExpression;
  }
  getLogicalNotExpression(): ExpressionNode {
    return this.getChildren()[0] as ExpressionNode;
  }
}
