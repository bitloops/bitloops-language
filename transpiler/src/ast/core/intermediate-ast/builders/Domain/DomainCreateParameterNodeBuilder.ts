import { DomainCreateParameterNode } from '../../nodes/Domain/DomainCreateParameterNode.js';
import { DomainCreateValueNode } from '../../nodes/Domain/DomainCreateParamValueNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PropsIdentifierNode } from '../../nodes/Props/PropsIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainCreateParameterNodeBuilder implements IBuilder<DomainCreateParameterNode> {
  private identifier: PropsIdentifierNode;
  private value: DomainCreateValueNode;

  private domainConstructorParameterNode: DomainCreateParameterNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainConstructorParameterNode = new DomainCreateParameterNode(metadata);
  }

  withIdentifierNode(parameter: PropsIdentifierNode): DomainCreateParameterNodeBuilder {
    this.identifier = parameter;
    return this;
  }
  withTypeNode(value: DomainCreateValueNode): DomainCreateParameterNodeBuilder {
    this.value = value;
    return this;
  }

  build(): DomainCreateParameterNode {
    this.domainConstructorParameterNode.addChild(this.identifier);
    this.domainConstructorParameterNode.addChild(this.value);
    this.domainConstructorParameterNode.buildObjectValue();
    return this.domainConstructorParameterNode;
  }
}
