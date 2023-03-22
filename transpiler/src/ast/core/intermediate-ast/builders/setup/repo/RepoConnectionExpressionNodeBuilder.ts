import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';
import { DatabaseTypeNode } from '../../../nodes/setup/repo/DatabaseTypeNode.js';
import { RepoConnectionExpressionNode } from '../../../nodes/setup/repo/RepoConnectionExpressionNode.js';
import { RepoConnectionOptionsNode } from '../../../nodes/setup/repo/RepoConnectionOptionsNode.js';

export class RepoConnectionExpressionNodeBuilder implements IBuilder<RepoConnectionExpressionNode> {
  private dbType: DatabaseTypeNode;
  private repoConnectionOptions: RepoConnectionOptionsNode;

  private repoConnectionExpressionNode: RepoConnectionExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.repoConnectionExpressionNode = new RepoConnectionExpressionNode(metadata);
  }

  public withDbType(dbType: DatabaseTypeNode): RepoConnectionExpressionNodeBuilder {
    this.dbType = dbType;
    return this;
  }

  public withRepoConnectionOptions(
    repoConnectionOptions: RepoConnectionOptionsNode,
  ): RepoConnectionExpressionNodeBuilder {
    this.repoConnectionOptions = repoConnectionOptions;
    return this;
  }

  public build(): RepoConnectionExpressionNode {
    this.repoConnectionExpressionNode.addChild(this.dbType);
    this.repoConnectionExpressionNode.addChild(this.repoConnectionOptions);

    this.repoConnectionExpressionNode.buildObjectValue();

    return this.repoConnectionExpressionNode;
  }
}
