import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PropsIdentifierNode } from '../../nodes/Props/PropsIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';
import { TParameterIdentifier } from '../../../../../types.js';

export class PropsIdentifierNodeBuilder implements IBuilder<PropsIdentifierNode> {
  private propsIdentifierNode: PropsIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.propsIdentifierNode = new PropsIdentifierNode(metadata);
  }

  public withName(identifierName: TParameterIdentifier): PropsIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): PropsIdentifierNode {
    this.propsIdentifierNode.buildLeafValue(this.name);

    return this.propsIdentifierNode;
  }
}
