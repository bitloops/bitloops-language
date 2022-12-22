import { TParameterIdentifier } from '../../../../../types.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterIdentifierNode } from '../../nodes/ParameterList/ParameterIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class ParameterIdentifierNodeBuilder implements IBuilder<ParameterIdentifierNode> {
  private parameterIdentifierNode: ParameterIdentifierNode;
  private value: TParameterIdentifier;

  constructor(metadata?: TNodeMetadata) {
    this.parameterIdentifierNode = new ParameterIdentifierNode(metadata);
  }

  public withIdentifier(identifier: TParameterIdentifier): ParameterIdentifierNodeBuilder {
    this.value = identifier;
    return this;
  }

  public build(): ParameterIdentifierNode {
    this.parameterIdentifierNode.buildLeafValue(this.value);

    return this.parameterIdentifierNode;
  }
}
