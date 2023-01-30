import { TGraphQLOperation } from '../../../../../../types.js';
import { GraphQLOperationTypeNode } from '../../../nodes/controllers/graphql/GraphQLOperationTypeNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class GraphQLOperationTypeNodeBuilder implements IBuilder<GraphQLOperationTypeNode> {
  private operationTypeNode: GraphQLOperationTypeNode;
  private operationTypeValue: TGraphQLOperation;

  constructor(metadata: TNodeMetadata) {
    this.operationTypeNode = new GraphQLOperationTypeNode(metadata);
  }

  public withOperationType(op: TGraphQLOperation): GraphQLOperationTypeNodeBuilder {
    this.operationTypeValue = op;
    return this;
  }

  public build(): GraphQLOperationTypeNode {
    this.operationTypeNode.buildLeafValue(this.operationTypeValue);

    return this.operationTypeNode;
  }
}
