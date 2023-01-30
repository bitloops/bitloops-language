import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RestServerAPIPrefixNode } from '../../nodes/setup/RestServerAPIPrefixNode.js';
import { StringLiteralNode } from '../../nodes/Expression/Literal/StringLiteralNode.js';
import { RestServerRouterPrefixNode } from '../../nodes/setup/RestServerRouterPrefixNode.js';

export class RestServerRouterPrefixNodeBuilder implements IBuilder<RestServerRouterPrefixNode> {
  private routerPrefixNode: RestServerAPIPrefixNode;
  private routerPrefix: StringLiteralNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.routerPrefixNode = new RestServerRouterPrefixNode(nodeMetadata);
  }

  public witRouterPrefix(routerPrefix: StringLiteralNode): RestServerRouterPrefixNodeBuilder {
    this.routerPrefix = routerPrefix;
    return this;
  }

  public build(): RestServerAPIPrefixNode {
    if (this.routerPrefix) {
      this.routerPrefixNode.addChild(this.routerPrefix);
    }

    this.routerPrefixNode.buildObjectValue();

    return this.routerPrefixNode;
  }
}
