import { TGraphQLControllerDependencies } from '../../../../../../types.js';
import { GraphQLControllerExecuteDependenciesNode } from '../../../nodes/controllers/graphql/GraphQLControllerExecuteDependenciesNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class GraphQLExecuteDependenciesNodeBuilder
  implements IBuilder<GraphQLControllerExecuteDependenciesNode>
{
  private controllerExecuteDependenciesNode: GraphQLControllerExecuteDependenciesNode;
  private dependenciesValue: TGraphQLControllerDependencies;

  constructor(metadata: TNodeMetadata) {
    this.controllerExecuteDependenciesNode = new GraphQLControllerExecuteDependenciesNode(metadata);
  }

  public withDependency(request: string): GraphQLExecuteDependenciesNodeBuilder {
    this.dependenciesValue = [request];
    return this;
  }

  public build(): GraphQLControllerExecuteDependenciesNode {
    this.controllerExecuteDependenciesNode.buildLeafValue(this.dependenciesValue);

    return this.controllerExecuteDependenciesNode;
  }
}
