import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { ExpressionBuilderDirector } from '../../directors/ExpressionDirector.js';
import { DomainEventDeclarationNode } from '../../nodes/DomainEvent/DomainEventDeclarationNode.js';
import { DomainEventIdentifierNode } from '../../nodes/DomainEvent/DomainEventIdentifierNode.js';
import { EntityIdentifierNode } from '../../nodes/Entity/EntityIdentifierNode.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainEventDeclarationNodeBuilder implements IBuilder<DomainEventDeclarationNode> {
  private domainEventNode: DomainEventDeclarationNode;
  private identifierNode: DomainEventIdentifierNode;
  private entityIdentifier: EntityIdentifierNode;
  private topic: ExpressionNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.domainEventNode = new DomainEventDeclarationNode(metadata);
  }

  public withIdentifier(
    dtoIdentifierNode: DomainEventIdentifierNode,
  ): DomainEventDeclarationNodeBuilder {
    this.identifierNode = dtoIdentifierNode;
    const dtoName = dtoIdentifierNode.getIdentifierName();
    this.domainEventNode.setClassName(dtoName);
    return this;
  }

  public withEntityIdentifier(
    entityIdentifier: EntityIdentifierNode,
  ): DomainEventDeclarationNodeBuilder {
    this.entityIdentifier = entityIdentifier;
    return this;
  }

  private generateTopicName(): string {
    const domainEventName = this.identifierNode.getIdentifierName();
    // convert cammelCase to snake_case and remove the 'DomainEvent' suffix and upper case all letters
    const topicName = domainEventName
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
      .toUpperCase()
      .replace(/_DOMAIN_EVENT$/, '');
    return topicName;
  }

  private topicStringToExpressionNode(topic: string): ExpressionNode {
    const topicExpressionNode = ExpressionBuilderDirector.buildStringLiteralExpression(topic);
    return topicExpressionNode;
  }

  public build(): DomainEventDeclarationNode {
    this.intermediateASTTree.insertChild(this.domainEventNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.entityIdentifier);
    if (!this.topic) {
      this.topic = this.topicStringToExpressionNode(this.generateTopicName());
      this.intermediateASTTree.insertSibling(this.topic);
    }
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.domainEventNode.buildObjectValue();

    return this.domainEventNode;
  }
}
