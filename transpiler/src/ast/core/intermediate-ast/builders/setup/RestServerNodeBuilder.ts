import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RestServerNode } from '../../nodes/setup/RestServerNode.js';
import { IBuilder } from '../IBuilder.js';

export class RestServerNodeBuilder implements IBuilder<RestServerNode> {
  private restServerNode: RestServerNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.restServerNode = new RestServerNode(nodeMetadata);
  }

  // public withServerType(serverType: ServerTypeIdentifierNode): RestServerNodeBuilder {
  //   this.serverType = serverType;
  //   return this;
  // }

  public withServerInstatiationOption(serverType: ServerTypeIdentifierNode): RestServerNodeBuilder {
    this.serverType = serverType;
    return this;
  }

  public build(): IdentifierNode {
    this.restServerNode.buildLeafValue(this.languageName);

    return this.restServerNode;
  }
}
