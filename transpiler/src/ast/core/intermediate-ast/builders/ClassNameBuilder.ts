import { ClassNameNode } from '../nodes/ClassNameNode.js';
import { IBuilder } from './IBuilder.js';

export class ClassNameNodeBuilder implements IBuilder<ClassNameNode> {
  private nameNode: ClassNameNode;
  private name: string;

  constructor() {
    this.nameNode = new ClassNameNode();
  }

  public withClassName(name: string): ClassNameNodeBuilder {
    this.name = name;
    return this;
  }

  public build(): ClassNameNode {
    this.nameNode.buildLeafValue(this.name);

    return this.nameNode;
  }
}
