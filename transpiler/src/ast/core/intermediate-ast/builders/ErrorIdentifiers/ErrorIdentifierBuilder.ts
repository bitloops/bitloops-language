import { ErrorIdentifierNode } from '../../nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class ErrorIdentifierNodeBuilder implements IBuilder<ErrorIdentifierNode> {
  private errorIdentifierNode: ErrorIdentifierNode;
  private identifierName: string;

  constructor(metadata?: TNodeMetadata) {
    this.errorIdentifierNode = new ErrorIdentifierNode(metadata);
  }

  public withName(identifierName: string): ErrorIdentifierNodeBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public build(): ErrorIdentifierNode {
    this.errorIdentifierNode.buildLeafValue(this.identifierName);

    return this.errorIdentifierNode;
  }
}
