import { LiteralNode } from '../../nodes/Expression/Literal/LiteralNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { DefaultEnvVarValueNode } from '../../nodes/setup/DefaultEnvVarValueNode.js';
import { IBuilder } from '../IBuilder.js';

export class DefaultEnvVarValueNodeBuilder implements IBuilder<DefaultEnvVarValueNode> {
  private literalNode: LiteralNode;
  private defaultValueNode: DefaultEnvVarValueNode;

  constructor(metadata?: TNodeMetadata) {
    this.defaultValueNode = new DefaultEnvVarValueNode(metadata);
  }

  public withLiteral(literalNode: LiteralNode): DefaultEnvVarValueNodeBuilder {
    this.literalNode = literalNode;
    return this;
  }

  public build(): DefaultEnvVarValueNode {
    this.defaultValueNode.addChild(this.literalNode);

    this.defaultValueNode.buildObjectValue();

    return this.defaultValueNode;
  }
}
