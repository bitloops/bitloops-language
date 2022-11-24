import { BuildInClassTypeNode } from '../../nodes/BitloopsPrimaryType/BuildInClassTypeNode.js';
import { IBuilder } from '../IBuilder.js';
import { BitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';

export class BitloopsPrimaryTypeBuilder implements IBuilder<BitloopsPrimaryTypeNode> {
  private bitloopsPrimaryTypeNode: BitloopsPrimaryTypeNode;
  private primaryType: BitloopsPrimaryTypeNode;

  constructor() {
    this.bitloopsPrimaryTypeNode = new BitloopsPrimaryTypeNode();
  }

  public withPrimaryType(type: BitloopsPrimaryTypeNode): BitloopsPrimaryTypeBuilder {
    this.primaryType = type;
    return this;
  }

  public build(): BuildInClassTypeNode {
    this.bitloopsPrimaryTypeNode.addChild(this.primaryType);

    this.bitloopsPrimaryTypeNode.buildObjectValue();

    return this.bitloopsPrimaryTypeNode;
  }
}
