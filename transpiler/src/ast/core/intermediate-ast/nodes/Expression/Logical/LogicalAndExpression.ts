import { LogicalExpressionNode } from './LogicalExpressionNode.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

const NAME = 'andExpression';
export class LogicalAndExpressionNode extends LogicalExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = NAME;
    this.nodeType = BitloopsTypesMapping.TAndExpression;
  }
}
