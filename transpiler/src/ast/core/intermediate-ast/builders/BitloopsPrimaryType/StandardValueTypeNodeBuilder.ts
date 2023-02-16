import { StandardVOTypeNode } from '../../nodes/BitloopsPrimaryType/StandardVOTypeNode.js';
import { StandardValueTypeNode } from '../../nodes/BitloopsPrimaryType/StandardValueTypeNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class StandardValueTypeNodeBuilder implements IBuilder<StandardValueTypeNode> {
  private standardValueTypeNode: StandardValueTypeNode;
  private type: StandardVOTypeNode;

  constructor(metadata?: TNodeMetadata) {
    this.standardValueTypeNode = new StandardValueTypeNode(metadata);
  }

  public withValue(type: StandardVOTypeNode): StandardValueTypeNodeBuilder {
    this.type = type;
    return this;
  }

  public build(): StandardValueTypeNode {
    this.standardValueTypeNode.addChild(this.type);
    this.standardValueTypeNode.buildObjectValue();

    return this.standardValueTypeNode;
  }
}
