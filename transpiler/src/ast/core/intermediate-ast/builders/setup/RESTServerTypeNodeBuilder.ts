import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RESTServerTypeNode } from '../../nodes/controllers/restController/RESTServerTypeNode.js';

export class RestServerTypeNodeBuilder implements IBuilder<RESTServerTypeNode> {
  private restServerTypeNode: RESTServerTypeNode;
  private serverType: string;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.restServerTypeNode = new RESTServerTypeNode(nodeMetadata);
  }

  public withServerType(serverType: string): RestServerTypeNodeBuilder {
    this.serverType = serverType;
    return this;
  }

  public build(): RESTServerTypeNode {
    this.restServerTypeNode.buildLeafValue(this.serverType);

    return this.restServerTypeNode;
  }
}
