import { IBuilder } from '../IBuilder.js';
import { BitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';

export class BitloopsPrimaryTypeBuilder implements IBuilder<BitloopsPrimaryTypeNode> {
  private bitloopsPrimaryTypeNode: BitloopsPrimaryTypeNode;
  private primaryType: BitloopsPrimaryTypeNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.bitloopsPrimaryTypeNode = new BitloopsPrimaryTypeNode(nodeMetadata);
  }

  public withPrimaryType(type: BitloopsPrimaryTypeNode): BitloopsPrimaryTypeBuilder {
    this.primaryType = type;
    return this;
  }

  public build(): BitloopsPrimaryTypeNode {
    this.bitloopsPrimaryTypeNode.addChild(this.primaryType);

    this.bitloopsPrimaryTypeNode.buildObjectValue();

    return this.bitloopsPrimaryTypeNode;
  }
}
