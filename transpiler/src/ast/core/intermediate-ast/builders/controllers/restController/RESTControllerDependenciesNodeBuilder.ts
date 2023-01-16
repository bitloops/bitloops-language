import { TRESTControllerDependencies } from '../../../../../../types.js';
import { RESTControllerExecuteDependenciesNode } from '../../../nodes/controllers/restController/RESTControllerExecuteDependenciesNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class RESTControllerExecuteDependenciesNodeBuilder
  implements IBuilder<RESTControllerExecuteDependenciesNode>
{
  private controllerExecuteDependenciesNode: RESTControllerExecuteDependenciesNode;
  private dependencies: TRESTControllerDependencies;

  constructor(metadata: TNodeMetadata) {
    this.controllerExecuteDependenciesNode = new RESTControllerExecuteDependenciesNode(metadata);
  }

  public withDependencies(
    request: string,
    reply: string,
  ): RESTControllerExecuteDependenciesNodeBuilder {
    this.dependencies = [request, reply];
    return this;
  }

  public build(): RESTControllerExecuteDependenciesNode {
    this.controllerExecuteDependenciesNode.buildLeafValue(this.dependencies);

    return this.controllerExecuteDependenciesNode;
  }
}
