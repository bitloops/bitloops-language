import { IdentifierListNode } from '../../nodes/identifier/IdentifierListNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class IdentifierListNodeBuilder implements IBuilder<IdentifierListNode> {
  private identifierListNode: IdentifierListNode;
  private identifierNodes: IdentifierNode[];

  constructor(metadata?: TNodeMetadata) {
    this.identifierListNode = new IdentifierListNode(metadata);
  }

  public withIdentifierList(identifiers: IdentifierNode[]): IdentifierListNodeBuilder {
    this.identifierNodes = identifiers;
    return this;
  }

  public build(): IdentifierListNode {
    if (this.identifierNodes) {
      this.identifierNodes.forEach((identifierNode) => {
        this.identifierListNode.addChild(identifierNode);
      });
    }
    this.identifierListNode.buildArrayValue();

    return this.identifierListNode;
  }
}
