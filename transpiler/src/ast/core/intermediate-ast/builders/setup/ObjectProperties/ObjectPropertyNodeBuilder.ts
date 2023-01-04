import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ObjectPropertyNode } from '../../../nodes/setup/ObjectPropertyNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ObjectPropertyNodeBuilder implements IBuilder<ObjectPropertyNode> {
  private objectPropertyNode: ObjectPropertyNode;
  private identifier: IdentifierNode;
  private expressionNode: ExpressionNode;

  constructor(nodeMeta?: TNodeMetadata) {
    this.objectPropertyNode = new ObjectPropertyNode(nodeMeta);
  }

  withIdentifier(identifier: IdentifierNode): ObjectPropertyNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withExpression(expression: ExpressionNode): ObjectPropertyNodeBuilder {
    this.expressionNode = expression;
    return this;
  }

  public build(): ObjectPropertyNode {
    this.objectPropertyNode.addChild(this.identifier);
    this.objectPropertyNode.addChild(this.expressionNode);
    this.objectPropertyNode.buildObjectValue();

    return this.objectPropertyNode;
  }
}
