import { ErrorIdentifierNode } from '../../nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { ErrorIdentifiersNode } from '../../nodes/ErrorIdentifiers/ErrorIdentifiersNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class ErrorIdentifiersNodeBuilder implements IBuilder<ErrorIdentifiersNode> {
  private errorIdentifiersNode: ErrorIdentifiersNode;
  private errorIdentifierNodes: ErrorIdentifierNode[];

  constructor(metadata?: TNodeMetadata) {
    this.errorIdentifiersNode = new ErrorIdentifiersNode(metadata);
  }

  public withErrors(errorIdentifierNodes: ErrorIdentifierNode[]): ErrorIdentifiersNodeBuilder {
    this.errorIdentifierNodes = errorIdentifierNodes;
    return this;
  }

  public build(): ErrorIdentifiersNode {
    if (this.errorIdentifierNodes) {
      this.errorIdentifierNodes.forEach((errorIdentifierNode) => {
        this.errorIdentifiersNode.addChild(errorIdentifierNode);
      });
    }
    this.errorIdentifiersNode.buildArrayValue();

    return this.errorIdentifiersNode;
  }
}
