import { DomainCreateParameterNode } from '../../nodes/Domain/DomainCreateParameterNode.js';
import { DomainCreateValueNode } from '../../nodes/Domain/DomainCreateParamValueNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PropsIdentifierNode } from '../../nodes/Props/PropsIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';
import { PropsIdentifierNodeBuilder } from '../Props/PropsIdentifierNodeBuilder.js';
import { DomainCreateParameterValueNodeBuilder } from './DomainCreateParamValueBuilder.js';

export class DomainCreateParameterNodeBuilder implements IBuilder<DomainCreateParameterNode> {
  private identifier: PropsIdentifierNode;
  private value: DomainCreateValueNode;

  private domainConstructorParameterNode: DomainCreateParameterNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainConstructorParameterNode = new DomainCreateParameterNode(metadata);
  }

  withIdentifierNode(parameter: string): DomainCreateParameterNodeBuilder {
    this.identifier = new PropsIdentifierNodeBuilder().withName(parameter).build();
    return this;
  }
  withTypeNode(value: string): DomainCreateParameterNodeBuilder {
    this.value = new DomainCreateParameterValueNodeBuilder().withValue(value).build();
    return this;
  }

  build(): DomainCreateParameterNode {
    this.domainConstructorParameterNode.addChild(this.identifier);
    this.domainConstructorParameterNode.addChild(this.value);
    this.domainConstructorParameterNode.buildObjectValue();
    return this.domainConstructorParameterNode;
  }
}
