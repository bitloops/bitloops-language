import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { DomainEventDeclarationNode } from '../../nodes/DomainEvent/DomainEventDeclarationNode.js';
import { DomainEventIdentifierNode } from '../../nodes/DomainEvent/DomainEventIdentifierNode.js';
import { EntityIdentifierNode } from '../../nodes/Entity/EntityIdentifierNode.js';
import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainEventDeclarationNodeBuilder implements IBuilder<DomainEventDeclarationNode> {
  private domainEventNode: DomainEventDeclarationNode;
  private identifierNode: DomainEventIdentifierNode;
  private entityIdentifier: EntityIdentifierNode;
  private fieldListNode?: FieldListNode;
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

  public withFieldList(fieldListNode: FieldListNode): DomainEventDeclarationNodeBuilder {
    this.fieldListNode = fieldListNode;
    return this;
  }

  public build(): DomainEventDeclarationNode {
    this.intermediateASTTree.insertChild(this.domainEventNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.entityIdentifier);
    if (this.fieldListNode) {
      this.intermediateASTTree.insertSibling(this.fieldListNode);
    }

    this.intermediateASTTree.setCurrentNodeToRoot();

    this.domainEventNode.buildObjectValue();

    return this.domainEventNode;
  }
}
