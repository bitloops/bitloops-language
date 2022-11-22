import { BitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { IBuilder } from '../IBuilder.js';

export class BitloopsPrimaryTypeBuilder implements IBuilder<BitloopsPrimaryTypeNode> {
  private bitloopsPrimaryTypeNode: BitloopsPrimaryTypeNode;
  private nodeName = 'type';

  public withType(primaryTypeNode: BitloopsPrimaryTypeNode): BitloopsPrimaryTypeBuilder {
    this.bitloopsPrimaryTypeNode = primaryTypeNode;
    return this;
  }

  public build(): BitloopsPrimaryTypeNode {
    this.bitloopsPrimaryTypeNode.setNodeName(this.nodeName);

    return this.bitloopsPrimaryTypeNode;
  }
}
