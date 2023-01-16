import { DomainCreateParameterNode } from '../../nodes/Domain/DomainCreateParameterNode.js';
import { DomainCreateParameterTypeNode } from '../../nodes/Domain/DomainCreateParameterTypeNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainCreateParameterNodeBuilder implements IBuilder<DomainCreateParameterNode> {
  private identifier: IdentifierNode;
  private parameterType: DomainCreateParameterTypeNode;

  private domainConstructorParameterNode: DomainCreateParameterNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainConstructorParameterNode = new DomainCreateParameterNode(metadata);
  }

  withIdentifierNode(parameter: IdentifierNode): DomainCreateParameterNodeBuilder {
    this.identifier = parameter;
    return this;
  }

  withTypeNode(parameterType: DomainCreateParameterTypeNode): DomainCreateParameterNodeBuilder {
    this.parameterType = parameterType;
    return this;
  }

  build(): DomainCreateParameterNode {
    this.domainConstructorParameterNode.addChild(this.identifier);
    this.domainConstructorParameterNode.addChild(this.parameterType);
    this.domainConstructorParameterNode.buildObjectValue();
    return this.domainConstructorParameterNode;
  }
}
