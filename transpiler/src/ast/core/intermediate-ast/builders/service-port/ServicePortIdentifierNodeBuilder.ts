import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ServicePortIdentifierNode } from '../../nodes/service-port/ServicePortIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class ServicePortIdentifierNodeBuilder implements IBuilder<ServicePortIdentifierNode> {
  private servicePortIdentifierNode: ServicePortIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.servicePortIdentifierNode = new ServicePortIdentifierNode(metadata);
  }

  public withName(identifierName: string): ServicePortIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): ServicePortIdentifierNode {
    this.servicePortIdentifierNode.buildLeafValue(this.name);

    return this.servicePortIdentifierNode;
  }
}
