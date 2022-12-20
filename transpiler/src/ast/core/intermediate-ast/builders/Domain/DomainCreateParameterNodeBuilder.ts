import { DomainCreateParameterNode } from '../../nodes/Domain/DomainCreateParameterNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PropsIdentifierNode } from '../../nodes/Props/PropsIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';
export class DomainCreateParameterNodeBuilder implements IBuilder<DomainCreateParameterNode> {
  private identifierNode: IdentifierNode;
  private propsTypeNode: PropsIdentifierNode;

  private domainConstructorParameterNode: DomainCreateParameterNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainConstructorParameterNode = new DomainCreateParameterNode(metadata);
  }

  withIdentifierNode(identifierNode: IdentifierNode): DomainCreateParameterNodeBuilder {
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
