import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ApplyRulesNode } from '../../../nodes/statements/builtinFunction/ApplyRulesStatementNode.js';
import { IBuilder } from '../../IBuilder.js';
import { AddDomainEventNode } from '../../../nodes/statements/builtinFunction/AddDomainEventNode.js';
import { DomainEventIdentifierNode } from '../../../nodes/DomainEvent/DomainEventIdentifierNode.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { ThisIdentifierNode } from '../../../nodes/ThisIdentifier/ThisIdentifierNode.js';

export class AddDomainEventNodeBuilder implements IBuilder<AddDomainEventNode> {
  private addDomainEventNode: AddDomainEventNode;
  private domainEventIdentifierNode: DomainEventIdentifierNode;
  private identifierNode?: IdentifierNode;
  private thisIdentifierNode?: ThisIdentifierNode;

  constructor(metadata: TNodeMetadata) {
    this.addDomainEventNode = new AddDomainEventNode(metadata);
  }

  public withDomainEventIdentifier(
    domainEventIdentifierNode: DomainEventIdentifierNode,
  ): AddDomainEventNodeBuilder {
    this.domainEventIdentifierNode = domainEventIdentifierNode;
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

  public build(): ApplyRulesNode {
    this.addDomainEventNode.addChild(this.domainEventIdentifierNode);
    this.identifierNode ? this.addDomainEventNode.addChild(this.identifierNode) : null;
    this.thisIdentifierNode ? this.addDomainEventNode.addChild(this.thisIdentifierNode) : null;

    this.addDomainEventNode.buildObjectValue();

    return this.addDomainEventNode;
  }
}
