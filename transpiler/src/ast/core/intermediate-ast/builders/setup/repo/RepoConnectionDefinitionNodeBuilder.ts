import { IntermediateASTTree } from '../../../IntermediateASTTree.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { RepoConnectionDefinitionNode } from '../../../nodes/setup/repo/RepoConnectionDefinitionNode.js';
import { RepoConnectionExpressionNode } from '../../../nodes/setup/repo/RepoConnectionExpressionNode.js';
import { IBuilder } from '../../IBuilder.js';

export class RepoConnectionDefinitionNodeBuilder implements IBuilder<RepoConnectionDefinitionNode> {
  private repoConnectionDefinitionNode: RepoConnectionDefinitionNode;
  private identifierNode: IdentifierNode;
  private repoConnectionExpressionNode: RepoConnectionExpressionNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.repoConnectionDefinitionNode = new RepoConnectionDefinitionNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): RepoConnectionDefinitionNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withExpression(
    repoConnectionExpressionNode: RepoConnectionExpressionNode,
  ): RepoConnectionDefinitionNodeBuilder {
    this.repoConnectionExpressionNode = repoConnectionExpressionNode;
    return this;
  }

  public build(): RepoConnectionDefinitionNode {
    this.intermediateASTTree.insertChild(this.repoConnectionDefinitionNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.repoConnectionExpressionNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.repoConnectionDefinitionNode.buildObjectValue();

    return this.repoConnectionDefinitionNode;
  }
}
