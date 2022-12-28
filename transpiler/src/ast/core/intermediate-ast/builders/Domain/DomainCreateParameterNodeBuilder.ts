import { DomainCreateParameterNode } from '../../nodes/Domain/DomainCreateParameterNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterNode } from '../../nodes/ParameterList/ParameterNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainCreateParameterNodeBuilder implements IBuilder<DomainCreateParameterNode> {
  private parameter: ParameterNode;

  private domainConstructorParameterNode: DomainCreateParameterNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainConstructorParameterNode = new DomainCreateParameterNode(metadata);
  }

  withParameter(parameter: ParameterNode): DomainCreateParameterNodeBuilder {
    this.parameter = parameter;
    return this;
  }

  build(): DomainCreateParameterNode {
    this.domainConstructorParameterNode.addChild(this.parameter);
    this.domainConstructorParameterNode.buildObjectValue();
    return this.domainConstructorParameterNode;
  }
}
