// import { TVariables } from '../../../types.js';
import { IBuilder } from './IBuilder.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { FieldListNode } from '../nodes/FieldListNode.js';
import { FieldNode } from '../nodes/FieldNode.js';

export class FieldListNodeBuilder implements IBuilder<FieldListNode> {
  private fieldListNode: FieldListNode;
  private fieldNodes: FieldNode[];
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree) {
    this.intermediateASTTree = intermediateASTTree;

    const classType = this.intermediateASTTree.getCurrentNodeClassType();
    this.fieldListNode = new FieldListNode();
    this.fieldListNode.setClassType(classType);
  }

  public withFields(fields: FieldNode[]): FieldListNodeBuilder {
    this.fieldNodes = fields;
    return this;
  }

  public build(): FieldListNode {
    // const variables: TVariables = [];
    this.fieldNodes.forEach((fieldNode) => {
      this.fieldListNode.addChild(fieldNode);
      // variables.push(fieldNode.value);
    });
    this.fieldListNode.buildArrayValue();

    return this.fieldListNode;
  }
}
