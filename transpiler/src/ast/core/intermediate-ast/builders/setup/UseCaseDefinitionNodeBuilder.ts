import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { UseCaseDefinitionNode } from '../../nodes/setup/UseCaseDefinitionNode.js';
import { UseCaseExpressionNode } from '../../nodes/setup/UseCaseExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class UseCaseDefinitionNodeBuilder implements IBuilder<UseCaseDefinitionNode> {
  private useCaseDefinitionNode: UseCaseDefinitionNode;
  private identifierNode: IdentifierNode;
  private useCaseExpressionNode: UseCaseExpressionNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.useCaseDefinitionNode = new UseCaseDefinitionNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): UseCaseDefinitionNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withExpression(
    useCaseExpressionNode: UseCaseExpressionNode,
  ): UseCaseDefinitionNodeBuilder {
    this.useCaseExpressionNode = useCaseExpressionNode;
    return this;
  }

  public build(): UseCaseDefinitionNode {
    this.intermediateASTTree.insertChild(this.useCaseDefinitionNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.useCaseExpressionNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.useCaseDefinitionNode.buildObjectValue();

    return this.useCaseDefinitionNode;
  }
}
