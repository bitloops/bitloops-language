import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ValueObjectIdentifierNode } from '../../nodes/valueObject/ValueObjectIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class ValueObjectIdentifierNodeBuilder implements IBuilder<ValueObjectIdentifierNode> {
  private valueObjectIdentifierNode: ValueObjectIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.valueObjectIdentifierNode = new ValueObjectIdentifierNode(metadata);
  }

  public withName(identifierName: string): ValueObjectIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): ValueObjectIdentifierNode {
    this.valueObjectIdentifierNode.buildLeafValue(this.name);

    return this.valueObjectIdentifierNode;
  }
}
