import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../../../nodes/setup/BoundedContextModuleNode.js';
import { RepoAdapterExpressionNode } from '../../../../intermediate-ast/nodes/setup/repo/RepoAdapterExpressionNode.js';
import { ConcretedRepoPortNode } from '../../../../intermediate-ast/nodes/setup/repo/ConcretedRepoPortNode.js';
import { IBuilder } from '../../IBuilder.js';
import { RepoAdapterOptionsNode } from '../../../nodes/setup/repo/RepoAdapterOptionsNode.js';
import { DatabaseTypeNode } from '../../../nodes/setup/repo/DatabaseTypeNode.js';
import { RepoAdapterClassNameNodeBuilder } from './RepoAdapterClassNameNodeBuiler.js';

export class RepoAdapterExpressionNodeBuilder implements IBuilder<RepoAdapterExpressionNode> {
  private repoAdapterExpressionNode: RepoAdapterExpressionNode;
  private bcModuleNode: BoundedContextModuleNode;
  private databaseTypeNode: DatabaseTypeNode;
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

  public withDatabaseType(databaseTypeNode: DatabaseTypeNode): RepoAdapterExpressionNodeBuilder {
    this.databaseTypeNode = databaseTypeNode;
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
    this.repoAdapterExpressionNode.addChild(this.databaseTypeNode);
    this.repoAdapterExpressionNode.addChild(this.concretedRepoPortNode);

    const repoAdapterNameNode = new RepoAdapterClassNameNodeBuilder()
      .withRepoPort(this.concretedRepoPortNode)
      .withDBType(this.databaseTypeNode)
      .build();
    this.repoAdapterExpressionNode.addChild(repoAdapterNameNode);

    this.repoAdapterExpressionNode.buildObjectValue();

    return this.repoAdapterExpressionNode;
  }
}
