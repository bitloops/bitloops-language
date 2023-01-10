import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RESTServerTypeNode } from '../../nodes/controllers/restController/RESTServerTypeNode.js';
// import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';

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
    // if (this.serverType) {
    //   this.restServerTypeNode.addChild(this.serverType);
    // }

    this.restServerTypeNode.buildLeafValue(this.serverType);

    return this.restServerTypeNode;
  }
}
