import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RestServerAPIPrefixNode } from '../../nodes/setup/RestServerAPIPrefixNode.js';
import { StringLiteralNode } from '../../nodes/Expression/Literal/StringLiteralNode.js';

export class RestServerAPIPrefixNodeBuilder implements IBuilder<RestServerAPIPrefixNode> {
  private restServerAPIPrefixNode: RestServerAPIPrefixNode;
  private apiPrefix: StringLiteralNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.restServerAPIPrefixNode = new RestServerAPIPrefixNode(nodeMetadata);
  }

  public withAPIPrefix(apiPrefix: StringLiteralNode): RestServerAPIPrefixNodeBuilder {
    this.apiPrefix = apiPrefix;
    return this;
  }

  public build(): RestServerAPIPrefixNode {
    if (this.apiPrefix) {
      this.restServerAPIPrefixNode.addChild(this.apiPrefix);
    }

    this.restServerAPIPrefixNode.buildObjectValue();

    return this.restServerAPIPrefixNode;
  }
}
