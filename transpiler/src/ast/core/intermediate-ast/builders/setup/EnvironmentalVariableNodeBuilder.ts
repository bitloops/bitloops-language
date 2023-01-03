import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { DefaultEnvVarValueNode } from '../../nodes/setup/DefaultEnvVarValueNode.js';
import { EnvironmentalVariableNode } from '../../nodes/setup/EnvironmentalVariableNode.js';
import { IBuilder } from '../IBuilder.js';

export class EnvironmentalVariableNodeBuilder implements IBuilder<EnvironmentalVariableNode> {
  private environmentalVariableNode: EnvironmentalVariableNode;
  private identifierNode: IdentifierNode;
  private defaultValueNode: DefaultEnvVarValueNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.environmentalVariableNode = new EnvironmentalVariableNode(nodeMetadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): EnvironmentalVariableNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withDefaultValue(
    defaultValueNode: DefaultEnvVarValueNode,
  ): EnvironmentalVariableNodeBuilder {
    this.defaultValueNode = defaultValueNode;
    return this;
  }

  public build(): EnvironmentalVariableNode {
    this.environmentalVariableNode.addChild(this.identifierNode);
    if (this.defaultValueNode) {
      this.environmentalVariableNode.addChild(this.defaultValueNode);
    }
    this.environmentalVariableNode.buildObjectValue();

    return this.environmentalVariableNode;
  }
}
