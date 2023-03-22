import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { StructIdentifierNode } from '../../nodes/struct/StructIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class StructIdentifierNodeBuilder implements IBuilder<StructIdentifierNode> {
  private structIdentifierNode: StructIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.structIdentifierNode = new StructIdentifierNode(metadata);
  }

  public withName(identifierName: string): StructIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): StructIdentifierNode {
    this.structIdentifierNode.buildLeafValue(this.name);

    return this.structIdentifierNode;
  }
}
