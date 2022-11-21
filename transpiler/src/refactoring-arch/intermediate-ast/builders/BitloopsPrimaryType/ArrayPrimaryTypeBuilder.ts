import { ArrayPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/ArrayPrimaryTypeNode.js';
import { TBitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/type.js';
import { IBuilder } from '../IBuilder.js';

export class ArrayPrimaryTypeBuilder implements IBuilder<ArrayPrimaryTypeNode> {
  private arrayPrimaryTypeNode: ArrayPrimaryTypeNode;
  private bitloopsPrimaryTypeNode: TBitloopsPrimaryTypeNode;

  constructor() {
    this.arrayPrimaryTypeNode = new ArrayPrimaryTypeNode();
  }

  public withPrimaryType(primaryTypeNode: TBitloopsPrimaryTypeNode): ArrayPrimaryTypeBuilder {
    this.bitloopsPrimaryTypeNode = primaryTypeNode;
    return this;
  }

  public build(): ArrayPrimaryTypeNode {
    this.arrayPrimaryTypeNode.addChild(this.bitloopsPrimaryTypeNode);

    this.arrayPrimaryTypeNode.buildObjectValue();

    return this.arrayPrimaryTypeNode;
  }
}
