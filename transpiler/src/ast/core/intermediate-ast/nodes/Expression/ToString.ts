import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { bitloopsPrimitivesObj } from '../../../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'toStringMethod';
export class ToStringNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TToStringExpression;
    this.classNodeName = NAME;
  }

  getExpression(): ExpressionNode {
    return this.getChildNodeByType(BitloopsTypesMapping.TExpression);
  }

  getInferredType(): string {
    return bitloopsPrimitivesObj.string;
  }
}
