import { LogicalExpressionNode } from './LogicalExpressionNode.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

const NAME = 'xorExpression';
export class LogicalXorExpressionNode extends LogicalExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = NAME;
    this.nodeType = BitloopsTypesMapping.TXorExpression;
  }
}
