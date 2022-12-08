import { GraphQLControllerIdentifierNode } from '../../../nodes/controllers/graphql/GraphQLControllerIdentifierNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class GraphQLControllerIdentifierNodeBuilder
  implements IBuilder<GraphQLControllerIdentifierNode>
{
  private graphQLIdentifierNode: GraphQLControllerIdentifierNode;
  private name: string;

  constructor(metadata: TNodeMetadata) {
    this.graphQLIdentifierNode = new GraphQLControllerIdentifierNode(metadata);
  }

  public withName(identifierName: string): GraphQLControllerIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): GraphQLControllerIdentifierNode {
    this.graphQLIdentifierNode.buildLeafValue(this.name);

    return this.graphQLIdentifierNode;
  }
}
