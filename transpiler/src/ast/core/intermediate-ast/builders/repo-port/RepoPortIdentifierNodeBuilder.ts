import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RepoPortIdentifierNode } from '../../nodes/repo-port/RepoPortIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class RepoPortIdentifierNodeBuilder implements IBuilder<RepoPortIdentifierNode> {
  private repoPortIdentifierNode: RepoPortIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.repoPortIdentifierNode = new RepoPortIdentifierNode(metadata);
  }

  public withName(identifierName: string): RepoPortIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): RepoPortIdentifierNode {
    this.repoPortIdentifierNode.buildLeafValue(this.name);

    return this.repoPortIdentifierNode;
  }
}
