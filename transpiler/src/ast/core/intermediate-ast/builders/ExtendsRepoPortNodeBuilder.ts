import { ExtendsRepoPortsNode } from '../nodes/extendsRepoPortNode.js';
import { IdentifierNode } from '../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { IBuilder } from './IBuilder.js';

export class ExtendsRepoPortsNodeBuilder implements IBuilder<ExtendsRepoPortsNode> {
  private identifierListNode: ExtendsRepoPortsNode;
  private identifierNodes: IdentifierNode[];

  constructor(metadata?: TNodeMetadata) {
    this.identifierListNode = new ExtendsRepoPortsNode(metadata);
  }

  public withIdentifierList(identifiers: IdentifierNode[]): ExtendsRepoPortsNodeBuilder {
    this.identifierNodes = identifiers;
    return this;
  }

  public build(): ExtendsRepoPortsNode {
    if (this.identifierNodes.length > 0) {
      this.identifierNodes.forEach((identifierNode) => {
        this.identifierListNode.addChild(identifierNode);
      });
    }
    this.identifierListNode.buildArrayValue();

    return this.identifierListNode;
  }
}
