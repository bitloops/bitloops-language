import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../../../nodes/setup/BoundedContextModuleNode.js';
import { RepoAdapterClassNameNode } from '../../../../intermediate-ast/nodes/setup/repo/RepoAdapterClassNameNode.js';
import { RepoAdapterExpressionNode } from '../../../../intermediate-ast/nodes/setup/repo/RepoAdapterExpressionNode.js';
import { ConcretedRepoPortNode } from '../../../../intermediate-ast/nodes/setup/repo/ConcretedRepoPortNode.js';
import { IBuilder } from '../../IBuilder.js';
import { RepoAdapterOptionsNode } from '../../../nodes/setup/repo/RepoAdapterOptionsNode.js';

export class RepoAdapterExpressionNodeBuilder implements IBuilder<RepoAdapterExpressionNode> {
  private repoAdapterExpressionNode: RepoAdapterExpressionNode;
  private bcModuleNode: BoundedContextModuleNode;
  private repoAdapterClassNameNode: RepoAdapterClassNameNode;
  private repoAdapterOptionsNode: RepoAdapterOptionsNode;
  private concretedRepoPortNode: ConcretedRepoPortNode;

  constructor(metadata?: TNodeMetadata) {
    this.repoAdapterExpressionNode = new RepoAdapterExpressionNode(metadata);
  }

  public withBoundedContextModule(
    bcModuleNode: BoundedContextModuleNode,
  ): RepoAdapterExpressionNodeBuilder {
    this.bcModuleNode = bcModuleNode;
    return this;
  }

  public withOptions(
    repoAdapterOptionsNode: RepoAdapterOptionsNode,
  ): RepoAdapterExpressionNodeBuilder {
    this.repoAdapterOptionsNode = repoAdapterOptionsNode;
    return this;
  }

  public withClassName(
    repoAdapterClassNameNode: RepoAdapterClassNameNode,
  ): RepoAdapterExpressionNodeBuilder {
    this.repoAdapterClassNameNode = repoAdapterClassNameNode;
    return this;
  }

  public withConcretedRepoPort(
    concretedRepoPortNode: ConcretedRepoPortNode,
  ): RepoAdapterExpressionNodeBuilder {
    this.concretedRepoPortNode = concretedRepoPortNode;
    return this;
  }

  public build(): RepoAdapterExpressionNode {
    this.repoAdapterExpressionNode.addChild(this.bcModuleNode);
    this.repoAdapterExpressionNode.addChild(this.repoAdapterOptionsNode);
    this.repoAdapterExpressionNode.addChild(this.repoAdapterClassNameNode);
    this.repoAdapterExpressionNode.addChild(this.concretedRepoPortNode);

    this.repoAdapterExpressionNode.buildObjectValue();

    return this.repoAdapterExpressionNode;
  }
}
