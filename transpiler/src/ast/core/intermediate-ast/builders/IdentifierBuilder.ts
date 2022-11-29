import { TIdentifier } from '../../../../types.js';
import { IdentifierNode } from '../nodes/IdentifierNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { IBuilder } from './IBuilder.js';

export class IdentifierBuilder implements IBuilder<IdentifierNode> {
  public readonly NAME = 'identifier';

  private identifierNode: IdentifierNode;
  private name: TIdentifier;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.identifierNode = new IdentifierNode(nodeMetadata);
  }

  public withName(name: TIdentifier): IdentifierBuilder {
    this.name = name;
    return this;
  }

  public build(): IdentifierNode {
    this.identifierNode.buildLeafValue(this.name);

    return this.identifierNode;
  }
}
