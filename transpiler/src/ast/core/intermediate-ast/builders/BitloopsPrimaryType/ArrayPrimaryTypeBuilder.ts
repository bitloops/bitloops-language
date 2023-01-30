import { ArrayPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/ArrayPrimaryTypeNode.js';
import { BitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { IBuilder } from '../IBuilder.js';

export class ArrayPrimaryTypeBuilder implements IBuilder<ArrayPrimaryTypeNode> {
  private arrayPrimaryTypeNode: ArrayPrimaryTypeNode;
  private bitloopsPrimaryTypeNode: BitloopsPrimaryTypeNode;

  constructor() {
    this.arrayPrimaryTypeNode = new ArrayPrimaryTypeNode();
  }

  public withPrimaryType(primaryTypeNode: BitloopsPrimaryTypeNode): ArrayPrimaryTypeBuilder {
    this.bitloopsPrimaryTypeNode = primaryTypeNode;
    return this;
  }

  public build(): ArrayPrimaryTypeNode {
    this.arrayPrimaryTypeNode.addChild(this.bitloopsPrimaryTypeNode);

    this.arrayPrimaryTypeNode.buildObjectValue();

    return this.arrayPrimaryTypeNode;
  }
}
