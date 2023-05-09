import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';
import { AddDomainEventNode } from '../../../nodes/statements/builtinFunction/AddDomainEventNode.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { ThisIdentifierNode } from '../../../nodes/ThisIdentifier/ThisIdentifierNode.js';
import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';

export class AddDomainEventNodeBuilder implements IBuilder<AddDomainEventNode> {
  private addDomainEventNode: AddDomainEventNode;
  private identifierNode?: IdentifierNode;
  private thisIdentifierNode?: ThisIdentifierNode;
  private expressionNode: ExpressionNode;

  constructor(metadata: TNodeMetadata) {
    this.addDomainEventNode = new AddDomainEventNode(metadata);
  }

  public withExpression(expressionNode: ExpressionNode): AddDomainEventNodeBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public withIdentifier(identifierNode: IdentifierNode): AddDomainEventNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withThisIdentifier(thisIdentifierNode: ThisIdentifierNode): AddDomainEventNodeBuilder {
    this.thisIdentifierNode = thisIdentifierNode;
    return this;
  }

  public build(): AddDomainEventNode {
    this.addDomainEventNode.addChild(this.expressionNode);
    this.identifierNode ? this.addDomainEventNode.addChild(this.identifierNode) : null;
    this.thisIdentifierNode ? this.addDomainEventNode.addChild(this.thisIdentifierNode) : null;

    this.addDomainEventNode.buildObjectValue();

    return this.addDomainEventNode;
  }
}
