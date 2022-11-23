import { TBitloopsPrimitives } from '../../../../../../types.js';
import { LiteralTypeNode } from '../../../../nodes/Expression/Literal/components/LiteralTypeNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class LiteralTypeBuilder implements IBuilder<LiteralTypeNode> {
  public readonly NAME = 'value';

  private literalTypeNode: LiteralTypeNode;
  private type: TBitloopsPrimitives;

  constructor() {
    this.literalTypeNode = new LiteralTypeNode();
  }

  public withType(type: TBitloopsPrimitives): LiteralTypeBuilder {
    this.type = type;
    return this;
  }

  public build(): LiteralTypeNode {
    this.literalTypeNode.buildLeafValue(this.type);

    return this.literalTypeNode;
  }
}
