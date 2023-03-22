import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { DTOIdentifierNode } from '../../nodes/DTO/DTOIdentifierNode.js';
import { DTONode } from '../../nodes/DTO/DTONode.js';
import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DTONodeBuilder implements IBuilder<DTONode> {
  private dtoNode: DTONode;
  private identifierNode: DTOIdentifierNode;
  private variablesNode: FieldListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.dtoNode = new DTONode(metadata);
  }

  public withIdentifier(dtoIdentifierNode: DTOIdentifierNode): DTONodeBuilder {
    this.identifierNode = dtoIdentifierNode;
    const dtoName = dtoIdentifierNode.getIdentifierName();
    this.dtoNode.setClassName(dtoName);
    return this;
  }

  public withVariables(fieldListNode: FieldListNode): DTONodeBuilder {
    this.variablesNode = fieldListNode;
    return this;
  }

  public build(): DTONode {
    this.intermediateASTTree.insertChild(this.dtoNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.variablesNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.dtoNode.buildObjectValue();

    return this.dtoNode;
  }
}
