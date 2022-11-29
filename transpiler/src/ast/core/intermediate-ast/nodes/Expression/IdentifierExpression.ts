import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'identifier';
export class IdentifierExpressionNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TIdentifierExpression;
    this.classNodeName = NAME;
  }
}
