import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { EntityValuesNode } from '../../nodes/Entity/EntityValuesNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';
import { EntityIdentifierNode } from '../../nodes/Entity/EntityIdentifierNode.js';
import { RootEntityDeclarationNode } from '../../nodes/RootEntity/RootEntityDeclarationNode.js';

export class RootEntityDeclarationNodeBuilder implements IBuilder<RootEntityDeclarationNode> {
  private RootEntityDeclarationNode: RootEntityDeclarationNode;
  private identifierNode: EntityIdentifierNode;
  private entityValuesNode: EntityValuesNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.RootEntityDeclarationNode = new RootEntityDeclarationNode(metadata);
  }

  public withIdentifier(
    rootEntityIdentifierNode: EntityIdentifierNode,
  ): RootEntityDeclarationNodeBuilder {
    this.identifierNode = rootEntityIdentifierNode;
    const entityName = rootEntityIdentifierNode.getIdentifierName();
    this.RootEntityDeclarationNode.setClassName(entityName);
    return this;
  }

  public withValues(rootEntityValuesNode: EntityValuesNode): RootEntityDeclarationNodeBuilder {
    this.entityValuesNode = rootEntityValuesNode;
    return this;
  }

  public build(): RootEntityDeclarationNode {
    this.intermediateASTTree.insertChild(this.RootEntityDeclarationNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.entityValuesNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.RootEntityDeclarationNode.buildObjectValue();

    return this.RootEntityDeclarationNode;
  }
}
