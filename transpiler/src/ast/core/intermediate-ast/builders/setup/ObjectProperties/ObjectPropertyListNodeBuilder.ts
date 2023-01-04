import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ObjectPropertyListNode } from '../../../nodes/setup/ObjectPropertyListNode.js';
import { ObjectPropertyNode } from '../../../nodes/setup/ObjectPropertyNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ObjectPropertyListNodeBuilder implements IBuilder<ObjectPropertyListNode> {
  private objectPropertyListNode: ObjectPropertyListNode;
  private objectPropertyNodes: ObjectPropertyNode[];

  constructor(metadata?: TNodeMetadata) {
    this.objectPropertyListNode = new ObjectPropertyListNode(metadata);
  }

  public withObjectProperties(
    objectProperties: ObjectPropertyNode[],
  ): ObjectPropertyListNodeBuilder {
    this.objectPropertyNodes = objectProperties;
    return this;
  }

  public build(): ObjectPropertyListNode {
    this.objectPropertyNodes.forEach((objectPropertyNode) => {
      this.objectPropertyListNode.addChild(objectPropertyNode);
    });
    this.objectPropertyListNode.buildArrayValue();

    return this.objectPropertyListNode;
  }
}
