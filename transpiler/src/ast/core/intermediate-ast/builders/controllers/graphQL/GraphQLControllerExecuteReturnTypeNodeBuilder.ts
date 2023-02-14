import { GraphQLControllerExecuteReturnTypeNode } from '../../../nodes/controllers/graphql/GraphQLControllerExecuteReturnTypeNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class GraphQLControllerExecuteReturnTypeNodeBuilder
  implements IBuilder<GraphQLControllerExecuteReturnTypeNode>
{
  private returnType: GraphQLControllerExecuteReturnTypeNode;
  private type: string;
  constructor(metadata?: TNodeMetadata) {
    this.returnType = new GraphQLControllerExecuteReturnTypeNode(metadata);
  }
  public withType(type: string): GraphQLControllerExecuteReturnTypeNodeBuilder {
    this.type = type;
    return this;
  }
  public build(): GraphQLControllerExecuteReturnTypeNode {
    this.returnType.buildLeafValue(this.type);
    return this.returnType;
  }
}
