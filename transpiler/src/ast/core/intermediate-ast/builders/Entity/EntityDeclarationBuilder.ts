import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { EntityValuesNode } from '../../nodes/Entity/EntityValuesNode.js';
import { EntityDeclarationNode } from '../../nodes/Entity/EntityDeclarationNode.js';
import { EntityIdentifierNode } from '../../nodes/Entity/EntityIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class EntityDeclarationNodeBuilder implements IBuilder<EntityDeclarationNode> {
  private entityDeclarationNode: EntityDeclarationNode;
  private identifierNode: EntityIdentifierNode;
  private entityValuesNode: EntityValuesNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.entityDeclarationNode = new EntityDeclarationNode(metadata);
  }

  public withIdentifier(entityIdentifierNode: EntityIdentifierNode): EntityDeclarationNodeBuilder {
    this.identifierNode = entityIdentifierNode;
    const entityName = entityIdentifierNode.getIdentifierName();
    this.entityDeclarationNode.setClassName(entityName);
    return this;
  }

  public withValues(entityValuesNode: EntityValuesNode): EntityDeclarationNodeBuilder {
    this.entityValuesNode = entityValuesNode;
    return this;
  }

  public build(): EntityDeclarationNode {
    this.intermediateASTTree.insertChild(this.entityDeclarationNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.entityValuesNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.entityDeclarationNode.buildObjectValue();

    return this.entityDeclarationNode;
  }
}
