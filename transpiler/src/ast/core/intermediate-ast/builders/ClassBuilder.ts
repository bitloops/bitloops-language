import { BitloopsPrimaryTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ClassNode } from '../nodes/ClassNode.js';
import { IBuilder } from './IBuilder.js';

export class ClassNodeBuilder implements IBuilder<ClassNode> {
  private classNode: ClassNode;
  private class: BitloopsPrimaryTypeNode;

  constructor() {
    this.classNode = new ClassNode();
  }

  public withClass(name: BitloopsPrimaryTypeNode): ClassNodeBuilder {
    this.class = name;
    return this;
  }

  public build(): ClassNode {
    this.classNode.addChild(this.class);

    this.classNode.buildObjectValue();

    return this.classNode;
  }
}
