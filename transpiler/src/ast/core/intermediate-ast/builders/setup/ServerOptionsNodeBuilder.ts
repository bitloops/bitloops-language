import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ServerOptionsNode } from '../../nodes/setup/ServerOptionsNode.js';
import { ServerOptionNode } from '../../nodes/setup/ServerOptionNode.js';
import { ServerTypeIdentifierNode } from '../../nodes/setup/ServerTypeIdentifierNode.js';
import { RestServerPortNode } from '../../nodes/setup/RestServerPortNode.js';
import { RestServerAPIPrefixNode } from '../../nodes/setup/RestServerAPIPrefixNode.js';

export class ServerOptionsNodeBuilder implements IBuilder<ServerOptionsNode> {
  private serverOptionsNode: ServerOptionsNode;
  private serverOptions: ServerOptionNode[];
  private port: RestServerPortNode;
  private apiPrefix: RestServerAPIPrefixNode;
  private serverType: ServerTypeIdentifierNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.serverOptionsNode = new ServerOptionsNode(nodeMetadata);
  }

  public withServerOptions(serverOptions: ServerOptionNode[]): ServerOptionsNodeBuilder {
    this.serverOptions = serverOptions;
    return this;
  }

  public withPort(port: RestServerPortNode): ServerOptionsNodeBuilder {
    this.port = port;
    return this;
  }

  public withAPIPrefix(apiPrefix: RestServerAPIPrefixNode): ServerOptionsNodeBuilder {
    this.apiPrefix = apiPrefix;
    return this;
  }

  public withServerType(serverType: ServerTypeIdentifierNode): ServerOptionsNodeBuilder {
    this.serverType = serverType;
    return this;
  }

  public build(): ServerOptionsNode {
    if (this.port) {
      this.serverOptionsNode.addChild(this.port);
    }

    if (this.apiPrefix) {
      this.serverOptionsNode.addChild(this.apiPrefix);
    }

    if (this.serverType) {
      this.serverOptionsNode.addChild(this.serverType);
    }

    if (this.serverOptions) {
      for (const serverOption of this.serverOptions) {
        this.serverOptionsNode.addChild(serverOption);
      }
    }

    this.serverOptionsNode.buildArrayValue();

    return this.serverOptionsNode;
  }
}
