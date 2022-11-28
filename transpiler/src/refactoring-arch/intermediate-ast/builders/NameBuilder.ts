import { NameNode } from '../nodes/NameNode.js';
import { IBuilder } from './IBuilder.js';

export class NameNodeBuilder implements IBuilder<NameNode> {
  private nameNode: NameNode;
  private name: string;

  constructor() {
    this.nameNode = new NameNode();
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
