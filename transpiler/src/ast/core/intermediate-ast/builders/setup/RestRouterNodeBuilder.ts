import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RestRouterNode } from '../../nodes/setup/RestRouterNode.js';
import { IBuilder } from '../IBuilder.js';

export class RestRouterNodeBuilder implements IBuilder<RestRouterNode> {
  private restRouterNode: RestRouterNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.restRouterNode = new RestRouterNode(metadata);
  }

  public withName(name: string): RestRouterNodeBuilder {
    this.name = name;
    return this;
  }

  public build(): RestRouterNode {
    this.restRouterNode.buildLeafValue(this.name);

    return this.restRouterNode;
  }
}
