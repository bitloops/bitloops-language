import { TBitloopsPrimitives } from '../../../../../types.js';
import { PrimitiveTypeNode } from '../../nodes/BitloopsPrimaryType/PrimitiveTypeNode.js';
import { IBuilder } from '../IBuilder.js';

export class PrimitiveTypeBuilder implements IBuilder<PrimitiveTypeNode> {
  private primitiveTypeNode: PrimitiveTypeNode;
  private type: TBitloopsPrimitives;

  constructor() {
    this.primitiveTypeNode = new PrimitiveTypeNode();
  }

  public withType(type: TBitloopsPrimitives): PrimitiveTypeBuilder {
    this.type = type;
    return this;
  }

  public build(): PrimitiveTypeNode {
    this.primitiveTypeNode.buildLeafValue(this.type);

    return this.primitiveTypeNode;
  }
}
