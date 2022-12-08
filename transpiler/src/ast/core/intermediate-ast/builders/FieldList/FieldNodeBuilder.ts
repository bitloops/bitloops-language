import { BitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { FieldNode } from '../../nodes/FieldList/FieldNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { OptionalNode } from '../../nodes/OptionalNode.js';
import { IBuilder } from '../IBuilder.js';

export class FieldNodeBuilder implements IBuilder<FieldNode> {
  public readonly NAME = 'field';

  private typeNode: BitloopsPrimaryTypeNode;
  private identifierNode: IdentifierNode;
  private optionalNode?: OptionalNode;
  private fieldNode: FieldNode;

  constructor() {
    this.fieldNode = new FieldNode();
  }

  public withType(typeNode: BitloopsPrimaryTypeNode): FieldNodeBuilder {
    this.typeNode = typeNode;
    return this;
  }

  public withName(identifierNode: IdentifierNode): FieldNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withOptional(optionalNode: OptionalNode): FieldNodeBuilder {
    this.optionalNode = optionalNode;
    return this;
  }

  public build(): FieldNode {
    this.fieldNode.addChild(this.typeNode);
    this.fieldNode.addChild(this.identifierNode);
    if (this.optionalNode) this.fieldNode.addChild(this.optionalNode);

    this.fieldNode.buildObjectValue();

    return this.fieldNode;
  }
}
