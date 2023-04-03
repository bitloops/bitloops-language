import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { QueryDeclarationNode } from '../../nodes/query/QueryDeclarationNode.js';
import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class QueryNodeBuilder implements IBuilder<QueryDeclarationNode> {
  private queryNode: QueryDeclarationNode;
  private identifierNode: IdentifierNode;
  private fieldListNode?: FieldListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.queryNode = new QueryDeclarationNode(metadata);
  }

  public withIdentifier(queryIdentifierNode: IdentifierNode): QueryNodeBuilder {
    this.identifierNode = queryIdentifierNode;
    const queryName = queryIdentifierNode.getIdentifierName();
    this.queryNode.setClassName(queryName);
    return this;
  }

  public withFieldList(fieldListNode: FieldListNode): QueryNodeBuilder {
    this.fieldListNode = fieldListNode;
    return this;
  }

  public build(): QueryDeclarationNode {
    this.intermediateASTTree.insertChild(this.queryNode);
    this.intermediateASTTree.insertChild(this.identifierNode);

    if (this.fieldListNode) {
      this.intermediateASTTree.insertSibling(this.fieldListNode);
    }
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.queryNode.buildObjectValue();

    return this.queryNode;
  }
}
