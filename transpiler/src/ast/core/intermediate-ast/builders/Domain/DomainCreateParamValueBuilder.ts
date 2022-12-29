import { DomainCreateValueNode } from '../../nodes/Domain/DomainCreateParamValueNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainCreateParameterValueNodeBuilder implements IBuilder<DomainCreateValueNode> {
  private domainConstructorParameterValueNode: DomainCreateValueNode;
  private value: string;

  constructor(metadata?: TNodeMetadata) {
    this.domainConstructorParameterValueNode = new DomainCreateValueNode(metadata);
  }

  withValue(value: string): DomainCreateParameterValueNodeBuilder {
    this.value = value;
    return this;
  }

  build(): DomainCreateValueNode {
    this.domainConstructorParameterValueNode.buildLeafValue(this.value);

    return this.domainConstructorParameterValueNode;
  }
}
