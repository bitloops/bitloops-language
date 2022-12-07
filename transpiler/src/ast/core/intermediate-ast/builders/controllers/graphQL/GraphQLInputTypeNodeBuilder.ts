import { GraphQLInputTypeNode } from '../../../nodes/controllers/graphql/GraphQLInputTypeNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class GraphQLInputTypeNodeBuilder implements IBuilder<GraphQLInputTypeNode> {
  private inputTypeNode: GraphQLInputTypeNode;
  private inputTypeValue: string | null;

  constructor(metadata?: TNodeMetadata) {
    this.inputTypeNode = new GraphQLInputTypeNode(metadata);
  }

  public withInputType(name: string): GraphQLInputTypeNodeBuilder {
    this.inputTypeValue = name;
    return this;
  }

  public build(): GraphQLInputTypeNode {
    this.inputTypeNode.buildLeafValue(this.inputTypeValue);

    return this.inputTypeNode;
  }
}
