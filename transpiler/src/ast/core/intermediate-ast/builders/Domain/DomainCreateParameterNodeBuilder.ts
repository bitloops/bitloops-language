import { DomainCreateParameterNode } from '../../nodes/Domain/DomainCreateParameterNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterIdentifierNode } from '../../nodes/ParameterList/ParameterIdentifierNode.js';
import { PropsIdentifierNode } from '../../nodes/Props/PropsIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainCreateParameterNodeBuilder implements IBuilder<DomainCreateParameterNode> {
  private identifierNode: ParameterIdentifierNode;
  private propsTypeNode: PropsIdentifierNode;

  private domainConstructorParameterNode: DomainCreateParameterNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainConstructorParameterNode = new DomainCreateParameterNode(metadata);
  }

  withIdentifierNode(identifierNode: ParameterIdentifierNode): DomainCreateParameterNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  withTypeNode(propsTypeNode: PropsIdentifierNode): DomainCreateParameterNodeBuilder {
    this.propsTypeNode = propsTypeNode;
    return this;
  }

  build(): DomainCreateParameterNode {
    this.domainConstructorParameterNode.addChild(this.identifierNode);
    this.domainConstructorParameterNode.addChild(this.propsTypeNode);
    this.domainConstructorParameterNode.buildObjectValue();
    return this.domainConstructorParameterNode;
  }
}
