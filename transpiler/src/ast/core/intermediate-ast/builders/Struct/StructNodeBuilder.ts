import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { StructNode } from '../../nodes/struct/StructNode.js';
import { IBuilder } from '../IBuilder.js';

export class StructNodeBuilder implements IBuilder<StructNode> {
  private structNode: StructNode;
  private identifierNode: IdentifierNode;
  private variablesNode: FieldListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.structNode = new StructNode(metadata);
  }

  public withIdentifier(structIdentifierNode: IdentifierNode): StructNodeBuilder {
    this.identifierNode = structIdentifierNode;
    const structName = structIdentifierNode.getIdentifierName();
    this.structNode.setClassName(structName);
    return this;
  }

  public withVariables(fieldListNode: FieldListNode): StructNodeBuilder {
    this.variablesNode = fieldListNode;
    return this;
  }

  public build(): StructNode {
    this.intermediateASTTree.insertChild(this.structNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.variablesNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.structNode.buildObjectValue();

    return this.structNode;
  }
}
