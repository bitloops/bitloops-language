import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { MethodDefinitionListNode } from '../../nodes/method-definitions/MethodDefinitionListNode.js';
import { ServicePortIdentifierNode } from '../../nodes/service-port/ServicePortIdentifierNode.js';
import { ServicePortNode } from '../../nodes/service-port/ServicePortNode.js';
import { IBuilder } from '../IBuilder.js';

export class ServicePortNodeBuilder implements IBuilder<ServicePortNode> {
  private servicePort: ServicePortNode;
  private servicePortIdentifier: ServicePortIdentifierNode;
  private methodDefinitionListNode: MethodDefinitionListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.servicePort = new ServicePortNode(metadata);
  }

  public withIdentifier(servicePortIdentifier: ServicePortIdentifierNode): ServicePortNodeBuilder {
    this.servicePortIdentifier = servicePortIdentifier;
    const servicePortName = servicePortIdentifier.getIdentifierName();
    this.servicePort.setClassName(servicePortName);
    return this;
  }

  public withMethodDefinitions(
    methodDefinitionListNode: MethodDefinitionListNode,
  ): ServicePortNodeBuilder {
    this.methodDefinitionListNode = methodDefinitionListNode;
    return this;
  }

  public build(): ServicePortNode {
    this.intermediateASTTree.insertChild(this.servicePort);
    this.intermediateASTTree.insertChild(this.servicePortIdentifier);
    this.intermediateASTTree.insertSibling(this.methodDefinitionListNode);

    this.intermediateASTTree.setCurrentNodeToRoot();
    this.servicePort.buildObjectValue();

    return this.servicePort;
  }
}
