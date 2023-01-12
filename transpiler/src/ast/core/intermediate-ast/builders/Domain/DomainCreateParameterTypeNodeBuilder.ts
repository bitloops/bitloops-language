import { DomainCreateParameterTypeNode } from '../../nodes/Domain/DomainCreateParameterTypeNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainCreateParameterTypeNodeBuilder
  implements IBuilder<DomainCreateParameterTypeNode>
{
  private domainConstructorParameterValueNode: DomainCreateParameterTypeNode;
  private type: string;

  constructor(metadata?: TNodeMetadata) {
    this.domainConstructorParameterValueNode = new DomainCreateParameterTypeNode(metadata);
  }

  withValue(type: string): DomainCreateParameterTypeNodeBuilder {
    this.type = type;
    return this;
  }

  build(): DomainCreateParameterTypeNode {
    this.domainConstructorParameterValueNode.buildLeafValue(this.type);

    return this.domainConstructorParameterValueNode;
  }
}
