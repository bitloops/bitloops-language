import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ThisIdentifierNode } from '../../nodes/ThisIdentifier/ThisIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class ThisIdentifierNodeBuilder implements IBuilder<ThisIdentifierNode> {
  private thisIdentifierNode: ThisIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.thisIdentifierNode = new ThisIdentifierNode(metadata);
  }

  public withName(identifierName: string): ThisIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): ThisIdentifierNode {
    this.thisIdentifierNode.buildLeafValue(this.name);

    return this.thisIdentifierNode;
  }
}
