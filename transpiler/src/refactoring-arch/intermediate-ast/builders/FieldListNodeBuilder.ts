import { IBuilder } from './IBuilder.js';
import { FieldListNode } from '../nodes/FieldListNode.js';
import { FieldNode } from '../nodes/FieldNode.js';

export class FieldListNodeBuilder implements IBuilder<FieldListNode> {
  private fieldListNode: FieldListNode;
  private fieldNodes: FieldNode[];

  constructor() {
    this.fieldListNode = new FieldListNode();
  }

  public withFields(fields: FieldNode[]): FieldListNodeBuilder {
    this.fieldNodes = fields;
    return this;
  }

  public build(): FieldListNode {
    this.fieldNodes.forEach((fieldNode) => {
      this.fieldListNode.addChild(fieldNode);
    });
    this.fieldListNode.buildArrayValue();

    return this.fieldListNode;
  }
}
