import { IntermediateASTTree } from '../../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IdentifierNode } from '../../../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { RepoAdapterExpressionNode } from '../../../../intermediate-ast/nodes/setup/repo/RepoAdapterExpressionNode.js';
import { IBuilder } from '../../IBuilder.js';
import { RepoAdapterDefinitionNode } from '../../../nodes/setup/repo/RepoAdapterDefinitionNode.js';

export class RepoAdapterDefinitionNodeBuilder implements IBuilder<RepoAdapterDefinitionNode> {
  private repoAdapterDefinitionNode: RepoAdapterDefinitionNode;
  private identifierNode: IdentifierNode;
  private repoAdapterExpressionNode: RepoAdapterExpressionNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.repoAdapterDefinitionNode = new RepoAdapterDefinitionNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): RepoAdapterDefinitionNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withExpression(
    repoAdapterExpressionNode: RepoAdapterExpressionNode,
  ): RepoAdapterDefinitionNodeBuilder {
    this.repoAdapterExpressionNode = repoAdapterExpressionNode;
    return this;
  }

  public build(): RepoAdapterDefinitionNode {
    this.intermediateASTTree.insertChild(this.repoAdapterDefinitionNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.repoAdapterExpressionNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.repoAdapterDefinitionNode.buildObjectValue();

    return this.repoAdapterDefinitionNode;
  }
}
