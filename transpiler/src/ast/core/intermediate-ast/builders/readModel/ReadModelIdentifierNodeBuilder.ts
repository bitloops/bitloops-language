import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ReadModelIdentifierNode } from '../../nodes/readModel/ReadModelIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class ReadModelIdentifierNodeBuilder implements IBuilder<ReadModelIdentifierNode> {
  private readModelIdentifierNode: ReadModelIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.readModelIdentifierNode = new ReadModelIdentifierNode(metadata);
  }

  public withName(identifierName: string): ReadModelIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): ReadModelIdentifierNode {
    this.readModelIdentifierNode.buildLeafValue(this.name);

    return this.readModelIdentifierNode;
  }
}
