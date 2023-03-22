import { GraphQLOperationNameNode } from '../../../nodes/controllers/graphql/GraphQLOperationNameNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class GraphQLOperationNameNodeBuilder implements IBuilder<GraphQLOperationNameNode> {
  private operationNameNode: GraphQLOperationNameNode;
  private operationNameValue: string;

  constructor(metadata?: TNodeMetadata) {
    this.operationNameNode = new GraphQLOperationNameNode(metadata);
  }

  public withOperationName(name: string): GraphQLOperationNameNodeBuilder {
    this.operationNameValue = name;
    return this;
  }

  public build(): GraphQLOperationNameNode {
    this.operationNameNode.buildLeafValue(this.operationNameValue);

    return this.operationNameNode;
  }
}
