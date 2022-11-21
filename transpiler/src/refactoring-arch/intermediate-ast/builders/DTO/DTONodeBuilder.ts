import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { DTOIdentifierNode } from '../../nodes/DTOIdentifierNode.js';
import { DTONode } from '../../nodes/DTONode.js';
import { FieldListNode } from '../../nodes/FieldListNode.js';
import { IBuilder } from '../IBuilder.js';

export class DTONodeBuilder implements IBuilder<DTONode> {
  private dtoNode: DTONode;
  private identifierNode: DTOIdentifierNode;
  private variablesNode: FieldListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree) {
    this.intermediateASTTree = intermediateASTTree;
    this.dtoNode = new DTONode();
  }

  public withIdentifier(dtoIdentifierNode: DTOIdentifierNode): DTONodeBuilder {
    this.identifierNode = dtoIdentifierNode;
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
    this.intermediateASTTree.traverse(this.dtoNode, (node) => console.log(node.getName()));

    return this.dtoNode;
  }
}
