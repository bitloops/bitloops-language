import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { FieldNode } from '../../nodes/FieldList/FieldNode.js';
import { IBuilder } from '../IBuilder.js';

export class ArgumentListNodeBuilder implements IBuilder<ArgumentListNode> {
  private argumentListNode: ArgumentListNode;
  private argumentNodes: FieldNode[];

  constructor() {
    this.argumentListNode = new ArgumentListNode();
  }

  public withFields(fields: FieldNode[]): ArgumentListNodeBuilder {
    this.argumentNodes = fields;
    return this;
  }

  public build(): ArgumentListNode {
    this.argumentNodes.forEach((fieldNode) => {
      this.argumentListNode.addChild(fieldNode);
    });
    this.argumentListNode.buildArrayValue();

    return this.argumentListNode;
  }
}
