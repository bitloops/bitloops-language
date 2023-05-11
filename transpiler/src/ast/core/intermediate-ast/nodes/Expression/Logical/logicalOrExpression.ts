import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { LogicalExpressionNode } from './LogicalExpressionNode.js';

const NAME = 'orExpression';
export class LogicalOrExpressionNode extends LogicalExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = NAME;
    this.nodeType = BitloopsTypesMapping.TOrExpression;
  }
}
