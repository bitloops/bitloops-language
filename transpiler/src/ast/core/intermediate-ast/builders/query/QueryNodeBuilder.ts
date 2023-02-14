import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { QueryDeclarationNode } from '../../nodes/query/QueryDeclarationNode.js';
import { FieldListNode } from '../../nodes/FieldList/FieldListNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';
import { QueryTopicNode } from '../../nodes/query/QueryTopicNode.js';
import { QueryTopicNodeBuilder } from './QueryTopicNodeBuilder.js';
import { TContextInfo } from '../../../BitloopsVisitor/BitloopsVisitor.js';

// produce the QueryNodeBuilder builder
export class QueryNodeBuilder implements IBuilder<QueryDeclarationNode> {
  private queryNode: QueryDeclarationNode;
  private identifierNode: IdentifierNode;
  private fieldListNode: FieldListNode;
  private topicNode: QueryTopicNode;
  private contextInfo: TContextInfo;
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

  public withTopic(topicNode: QueryTopicNode): QueryNodeBuilder {
    this.topicNode = topicNode;
    return this;
  }

  public withContextInfo(contextInfo: TContextInfo): QueryNodeBuilder {
    this.contextInfo = contextInfo;
    return this;
  }

  private getDefaultTopicNode(): QueryTopicNode {
    const topicNode = new QueryTopicNodeBuilder()
      .generateTopicName(this.identifierNode.getValue().identifier, this.contextInfo)
      .build();
    return topicNode;
  }

  public build(): QueryDeclarationNode {
    this.intermediateASTTree.insertChild(this.queryNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.fieldListNode);
    if (this.topicNode) {
      this.intermediateASTTree.insertSibling(this.topicNode);
    } else {
      this.intermediateASTTree.insertSibling(this.getDefaultTopicNode());
    }
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.queryNode.buildObjectValue();

    return this.queryNode;
  }
}
