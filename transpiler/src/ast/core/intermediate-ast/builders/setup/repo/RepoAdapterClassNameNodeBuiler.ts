import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { DatabaseTypeNode } from '../../../nodes/setup/repo/DatabaseTypeNode.js';
import { RepoAdapterClassNameNode } from '../../../nodes/setup/repo/RepoAdapterClassNameNode.js';
import { IBuilder } from '../../IBuilder.js';

export class RepoAdapterClassNameNodeBuilder implements IBuilder<RepoAdapterClassNameNode> {
  private repoAdapterClassNameNode: RepoAdapterClassNameNode;
  private connectionType: DatabaseTypeNode;

  constructor(metadata?: TNodeMetadata) {
    this.repoAdapterClassNameNode = new RepoAdapterClassNameNode(metadata);
  }

  public withConnectionType(connectionType: DatabaseTypeNode): RepoAdapterClassNameNodeBuilder {
    this.connectionType = connectionType;
    return this;
  }

  public build(): RepoAdapterClassNameNode {
    this.repoAdapterClassNameNode.addChild(this.connectionType);
    this.repoAdapterClassNameNode.buildObjectValue();

    return this.repoAdapterClassNameNode;
  }
}
