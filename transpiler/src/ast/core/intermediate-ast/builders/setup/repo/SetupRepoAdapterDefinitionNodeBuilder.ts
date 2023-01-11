import { IntermediateASTTree } from '../../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { RepoAdapterExpressionNode } from '../../../nodes/setup/repo/RepoAdapterExpressionNode.js';
import { IBuilder } from '../../IBuilder.js';
import { SetupRepoAdapterDefinitionNode } from '../../../nodes/setup/repo/SetupRepoAdapterDefinitionNode.js';

export class SetupRepoAdapterDefinitionNodeBuilder
  implements IBuilder<SetupRepoAdapterDefinitionNode>
{
  private repoAdapterDefinitionNode: SetupRepoAdapterDefinitionNode;
  private identifierNode: IdentifierNode;
  private repoAdapterExpressionNode: RepoAdapterExpressionNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.repoAdapterDefinitionNode = new SetupRepoAdapterDefinitionNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): SetupRepoAdapterDefinitionNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withExpression(
    repoAdapterExpressionNode: RepoAdapterExpressionNode,
  ): SetupRepoAdapterDefinitionNodeBuilder {
    this.repoAdapterExpressionNode = repoAdapterExpressionNode;
    return this;
  }

  public build(): SetupRepoAdapterDefinitionNode {
    this.intermediateASTTree.insertChild(this.repoAdapterDefinitionNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.repoAdapterExpressionNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.repoAdapterDefinitionNode.buildObjectValue();

    return this.repoAdapterDefinitionNode;
  }
}
