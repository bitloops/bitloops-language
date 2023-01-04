import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { DatabaseHostNode } from '../../../nodes/setup/repo/DatabaseHostNode.js';
import { IBuilder } from '../../IBuilder.js';
import { DatabaseNameNode } from '../../../nodes/setup/repo/DatabaseName.js';
import { DatabasePortNode } from '../../../nodes/setup/repo/DatabasePortNode.js';
import { RepoConnectionOptionsNode } from '../../../nodes/setup/repo/RepoConnectionOptionsNode.js';

export class RepoConnectionOptionsNodeBuilder implements IBuilder<RepoConnectionOptionsNode> {
  private host: DatabaseHostNode;
  private port: DatabasePortNode;
  private databaseName: DatabaseNameNode;

  private repoConnectionExpressionNode: RepoConnectionOptionsNode;

  constructor(metadata?: TNodeMetadata) {
    this.repoConnectionExpressionNode = new RepoConnectionOptionsNode(metadata);
  }

  public withHost(host: DatabaseHostNode): RepoConnectionOptionsNodeBuilder {
    this.host = host;
    return this;
  }

  public withPort(port: DatabasePortNode): RepoConnectionOptionsNodeBuilder {
    this.port = port;
    return this;
  }

  public withDatabaseName(databaseName: DatabaseNameNode): RepoConnectionOptionsNodeBuilder {
    this.databaseName = databaseName;
    return this;
  }

  public build(): RepoConnectionOptionsNode {
    this.repoConnectionExpressionNode.addChild(this.host);
    this.repoConnectionExpressionNode.addChild(this.port);
    this.repoConnectionExpressionNode.addChild(this.databaseName);

    this.repoConnectionExpressionNode.buildObjectValue();

    return this.repoConnectionExpressionNode;
  }
}
