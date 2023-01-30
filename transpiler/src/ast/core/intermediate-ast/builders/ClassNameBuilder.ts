import { ClassNameNode } from '../nodes/ClassNameNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { IBuilder } from './IBuilder.js';

export class ClassNameNodeBuilder implements IBuilder<ClassNameNode> {
  private nameNode: ClassNameNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.nameNode = new ClassNameNode(metadata);
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
