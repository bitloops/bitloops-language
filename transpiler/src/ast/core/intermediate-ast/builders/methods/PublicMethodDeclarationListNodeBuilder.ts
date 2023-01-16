import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PublicMethodDeclarationListNode } from '../../nodes/methods/PublicMethodDeclarationListNode.js';
import { PublicMethodDeclarationNode } from '../../nodes/methods/PublicMethodDeclarationNode.js';
import { IBuilder } from '../IBuilder.js';

export class PublicMethodDeclarationListNodeBuilder
  implements IBuilder<PublicMethodDeclarationListNode>
{
  private publicMethodDeclarationListNode: PublicMethodDeclarationListNode;
  private publicMethodDeclarationNodes: PublicMethodDeclarationNode[];

  constructor(metadata?: TNodeMetadata) {
    this.publicMethodDeclarationListNode = new PublicMethodDeclarationListNode(metadata);
  }

  public withMethods(
    publicMethodDeclarationNodes: PublicMethodDeclarationNode[],
  ): PublicMethodDeclarationListNodeBuilder {
    this.publicMethodDeclarationNodes = publicMethodDeclarationNodes;
    return this;
  }

  public build(): PublicMethodDeclarationListNode {
    if (this.publicMethodDeclarationNodes) {
      this.publicMethodDeclarationNodes.forEach((methodNode) => {
        this.publicMethodDeclarationListNode.addChild(methodNode);
      });
    }
    this.publicMethodDeclarationListNode.buildArrayValue();

    return this.publicMethodDeclarationListNode;
  }
}
