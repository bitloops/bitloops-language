import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { IdentifierNode } from '../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { RepoAdapterNode } from '../nodes/RepoAdapterNode.js';
import { RepoAdapterExpressionNode } from '../nodes/setup/repo/RepoAdapterExpressionNode.js';
import { IBuilder } from './IBuilder.js';

export class RepoAdapterNodeBuilder implements IBuilder<RepoAdapterNode> {
  private repoAdapterNode: RepoAdapterNode;
  private identifierNode: IdentifierNode;
  private repoAdapterExpressionNode: RepoAdapterExpressionNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.repoAdapterNode = new RepoAdapterNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): RepoAdapterNodeBuilder {
    this.identifierNode = identifierNode;
    const repoAdapterName = identifierNode.getIdentifierName();
    this.repoAdapterNode.setClassName(repoAdapterName);
    return this;
  }

  public withExpression(
    repoAdapterExpressionNode: RepoAdapterExpressionNode,
  ): RepoAdapterNodeBuilder {
    this.repoAdapterExpressionNode = repoAdapterExpressionNode;
    return this;
  }

  public build(): RepoAdapterNode {
    this.intermediateASTTree.insertChild(this.repoAdapterNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.repoAdapterExpressionNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.repoAdapterNode.buildObjectValue();

    return this.repoAdapterNode;
  }
}
