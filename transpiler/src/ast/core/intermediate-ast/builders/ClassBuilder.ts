import { ClassNode } from '../nodes/ClassNode.js';
import { IBuilder } from './IBuilder.js';

export class ClassNodeBuilder implements IBuilder<ClassNode> {
  private classNode: ClassNode;
  private class: string;

  constructor() {
    this.classNode = new ClassNode();
  }

  public withClass(name: string): ClassNodeBuilder {
    this.class = name;
    return this;
  }

  public build(): ClassNode {
    this.classNode.buildLeafValue(this.class);

    return this.classNode;
  }
}
