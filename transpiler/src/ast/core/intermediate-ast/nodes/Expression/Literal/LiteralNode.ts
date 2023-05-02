import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { TBitloopsPrimitives } from '../../../../../../types.js';

const name = 'literal';
export class LiteralNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = name;
    this.nodeType = BitloopsTypesMapping.TLiteral;
  }

  public getType(): TBitloopsPrimitives {
    return this.getChildren()[0].getValue();
  }
}
