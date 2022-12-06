import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { NameNode } from '../nodes/NameNode.js';
import { IBuilder } from './IBuilder.js';

export class NameNodeBuilder implements IBuilder<NameNode> {
  private nameNode: NameNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.nameNode = new NameNode(metadata);
  }

  public withName(name: string): NameNodeBuilder {
    this.name = name;
    return this;
  }

  public build(): NameNode {
    this.nameNode.buildLeafValue(this.name);

    return this.nameNode;
  }
}
