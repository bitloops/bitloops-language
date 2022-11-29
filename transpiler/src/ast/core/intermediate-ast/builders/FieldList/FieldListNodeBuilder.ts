import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { FieldNode } from '../../nodes/FieldList/FieldNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class FieldListNodeBuilder implements IBuilder<FieldListNode> {
  private fieldListNode: FieldListNode;
  private fieldNodes: FieldNode[];

  constructor(metadata?: TNodeMetadata) {
    this.fieldListNode = new FieldListNode(metadata);
  }

  public withFields(fields: FieldNode[]): FieldListNodeBuilder {
    this.fieldNodes = fields;
    return this;
  }

  public build(): FieldListNode {
    if (this.fieldNodes) {
      this.fieldNodes.forEach((fieldNode) => {
        this.fieldListNode.addChild(fieldNode);
      });
    }
    this.fieldListNode.buildArrayValue();

    return this.fieldListNode;
  }
}
