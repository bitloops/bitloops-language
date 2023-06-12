import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'staticMemberDotExpression';
export class StaticMemberDotExpressionNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TMethodCallExpression;
    this.classNodeName = NAME;
  }
}
