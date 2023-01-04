import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ServerOptionsNode } from '../../nodes/setup/ServerOptionsNode.js';
import { ServerTypeIdentifierNode } from '../../nodes/setup/ServerTypeIdentifierNode.js';
import { RestServerPortNode } from '../../nodes/setup/RestServerPortNode.js';
import { RestServerAPIPrefixNode } from '../../nodes/setup/RestServerAPIPrefixNode.js';
import { CorsOptionsNode } from '../../nodes/setup/CorsOptionsNode.js';

export class ServerOptionsNodeBuilder implements IBuilder<ServerOptionsNode> {
  private serverOptionsNode: ServerOptionsNode;
  private port: RestServerPortNode;
  private apiPrefix: RestServerAPIPrefixNode;
  private serverType: ServerTypeIdentifierNode;
  private corsOptions: CorsOptionsNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.serverOptionsNode = new ServerOptionsNode(nodeMetadata);
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

  public withCorsOptions(corsOptions: CorsOptionsNode): ServerOptionsNodeBuilder {
    this.corsOptions = corsOptions;
    return this;
  }

  public build(): ServerOptionsNode {
    this.serverOptionsNode.addChild(this.port);
    this.serverOptionsNode.addChild(this.serverType);

    if (this.apiPrefix) {
      this.serverOptionsNode.addChild(this.apiPrefix);
    }

    if (this.corsOptions) {
      this.serverOptionsNode.addChild(this.corsOptions);
    }

    this.serverOptionsNode.buildObjectValue();

    return this.serverOptionsNode;
  }
}
