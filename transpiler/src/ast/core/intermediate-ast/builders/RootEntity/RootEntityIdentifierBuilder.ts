import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RootEntityIdentifierNode } from '../../nodes/RootEntity/RootEntityIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class RootEntityIdentifierNodeBuilder implements IBuilder<RootEntityIdentifierNode> {
  private rootEntityIdentifierNode: RootEntityIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.rootEntityIdentifierNode = new RootEntityIdentifierNode(metadata);
  }

  public withName(identifierName: string): RootEntityIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): RootEntityIdentifierNode {
    this.rootEntityIdentifierNode.buildLeafValue(this.name);

    return this.rootEntityIdentifierNode;
  }
}
