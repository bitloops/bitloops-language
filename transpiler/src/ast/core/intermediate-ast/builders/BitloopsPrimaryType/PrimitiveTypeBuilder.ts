import { TBitloopsPrimitives } from '../../../../../types.js';
import { PrimitiveTypeNode } from '../../nodes/BitloopsPrimaryType/PrimitiveTypeNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class PrimitiveTypeBuilder implements IBuilder<PrimitiveTypeNode> {
  private primitiveTypeNode: PrimitiveTypeNode;
  private type: TBitloopsPrimitives;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.primitiveTypeNode = new PrimitiveTypeNode(nodeMetadata);
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
