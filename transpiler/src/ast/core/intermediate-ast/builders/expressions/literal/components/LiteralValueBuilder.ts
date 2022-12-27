import { LiteralValueNode } from '../../../../nodes/Expression/Literal/components/LiteralValueNode.js';
import { TNodeMetadata } from '../../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class LiteralValueBuilder implements IBuilder<LiteralValueNode> {
  public readonly NAME = 'type';

  private literalValueNode: LiteralValueNode;
  private value: string;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.literalValueNode = new LiteralValueNode(nodeMetadata);
  }

  public withValue(value: string): LiteralValueBuilder {
    this.value = value;
    return this;
  }

  public build(): LiteralValueNode {
    this.literalValueNode.buildLeafValue(this.value);

    return this.literalValueNode;
  }
}
