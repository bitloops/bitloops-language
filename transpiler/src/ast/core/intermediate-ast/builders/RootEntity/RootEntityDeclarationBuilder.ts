import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { DTOIdentifierNode } from '../../nodes/DTO/DTOIdentifierNode.js';
import { EntityValuesNode } from '../../nodes/Entity/EntityValuesNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';
import { RootEntityDeclalationNode } from '../../nodes/RootEntity/RootEntityDeclarationNode.js';
import { RootEntityIdentifierNode } from '../../nodes/RootEntity/RootEntityIdentifierNode.js';
import { RootEntityValuesNode } from '../../nodes/RootEntity/RootEntityValuesNode.js';

export class RootEntityDeclarationNodeBuilder implements IBuilder<RootEntityDeclalationNode> {
  private RootEntityDeclarationNode: RootEntityDeclalationNode;
  private identifierNode: DTOIdentifierNode;
  private entityValuesNode: EntityValuesNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.RootEntityDeclarationNode = new RootEntityDeclalationNode(metadata);
  }

  public withIdentifier(
    RootEntityIdentifierNode: RootEntityIdentifierNode,
  ): RootEntityDeclarationNodeBuilder {
    this.identifierNode = RootEntityIdentifierNode;
    const entityName = RootEntityIdentifierNode.getIdentifierName();
    this.RootEntityDeclarationNode.setClassName(entityName);
    return this;
  }

  public withValues(rootEntityValuesNode: RootEntityValuesNode): RootEntityDeclarationNodeBuilder {
    this.entityValuesNode = rootEntityValuesNode;
    return this;
  }

  public build(): RootEntityDeclalationNode {
    this.intermediateASTTree.insertChild(this.RootEntityDeclarationNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.entityValuesNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.RootEntityDeclarationNode.buildObjectValue();

    return this.RootEntityDeclarationNode;
  }
}
