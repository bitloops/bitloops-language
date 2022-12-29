import { LiteralNode } from '../../nodes/Expression/Literal/LiteralNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { EnviromentalVariableNode } from '../../nodes/setup/EnviromentalVariableNode.js';
import { IBuilder } from '../IBuilder.js';

export class EnviromentalVariableNodeBuilder implements IBuilder<EnviromentalVariableNode> {
  private enviromentalVariableNode: EnviromentalVariableNode;
  private identifierNode: IdentifierNode;
  private defaultValueNode: LiteralNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.enviromentalVariableNode = new EnviromentalVariableNode(nodeMetadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): EnviromentalVariableNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withDefaultValue(defaultValueNode: LiteralNode): EnviromentalVariableNodeBuilder {
    this.defaultValueNode = defaultValueNode;
    return this;
  }

  public build(): EnviromentalVariableNode {
    this.enviromentalVariableNode.addChild(this.identifierNode);
    if (this.defaultValueNode) {
      this.enviromentalVariableNode.addChild(this.defaultValueNode);
    }
    this.enviromentalVariableNode.buildObjectValue();

    return this.enviromentalVariableNode;
  }
}
