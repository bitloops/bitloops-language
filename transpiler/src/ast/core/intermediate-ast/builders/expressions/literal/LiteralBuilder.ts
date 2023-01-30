import { LiteralNode } from '../../../nodes/Expression/Literal/LiteralNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class LiteralBuilder implements IBuilder<LiteralNode> {
  private literalWrapper: LiteralNode;
  private actualLiteral: LiteralNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.literalWrapper = new LiteralNode(nodeMetadata);
  }

  public withLiteral(lit: LiteralNode): LiteralBuilder {
    this.actualLiteral = lit;
    return this;
  }

  public build(): LiteralNode {
    this.literalWrapper.addChild(this.actualLiteral);
    this.literalWrapper.buildObjectValue();

    return this.literalWrapper;
  }
}
