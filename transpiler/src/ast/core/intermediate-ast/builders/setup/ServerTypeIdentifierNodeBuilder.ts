import { TIdentifier } from '../../../../../types.js';
import { IBuilder } from '../IBuilder.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ServerTypeIdentifierNode } from '../../nodes/setup/ServerTypeIdentifierNode.js';

export class ServerTypeIdentifierNodeBuilder implements IBuilder<ServerTypeIdentifierNode> {
  private serverTypeIdentifierNode: ServerTypeIdentifierNode;
  private serverTypeIdentifierName: TIdentifier;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.serverTypeIdentifierNode = new ServerTypeIdentifierNode(nodeMetadata);
  }

  public withServerTypeIdentifier(
    serverTypeIdentifierName: TIdentifier,
  ): ServerTypeIdentifierNodeBuilder {
    this.serverTypeIdentifierName = serverTypeIdentifierName;
    return this;
  }

  public build(): IdentifierNode {
    this.serverTypeIdentifierNode.buildLeafValue(this.serverTypeIdentifierName);

    return this.serverTypeIdentifierNode;
  }
}
