import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PrivateMethodDeclarationListNode } from '../../nodes/methods/PrivateMethodDeclarationListNode.js';
import { PrivateMethodDeclarationNode } from '../../nodes/methods/PrivateMethodDeclarationNode.js';
import { IBuilder } from '../IBuilder.js';

export class PrivateMethodDeclarationListNodeBuilder
  implements IBuilder<PrivateMethodDeclarationListNode>
{
  private privateMethodDeclarationListNode: PrivateMethodDeclarationListNode;
  private privateMethodDeclarationNodes: PrivateMethodDeclarationNode[];

  constructor(metadata?: TNodeMetadata) {
    this.privateMethodDeclarationListNode = new PrivateMethodDeclarationListNode(metadata);
  }

  public withMethods(
    privateMethodDeclarationNodes: PrivateMethodDeclarationNode[],
  ): PrivateMethodDeclarationListNodeBuilder {
    this.privateMethodDeclarationNodes = privateMethodDeclarationNodes;
    return this;
  }

  public build(): PrivateMethodDeclarationListNode {
    if (this.privateMethodDeclarationNodes) {
      this.privateMethodDeclarationNodes.forEach((methodNode) => {
        this.privateMethodDeclarationListNode.addChild(methodNode);
      });
    }
    this.privateMethodDeclarationListNode.buildArrayValue();

    return this.privateMethodDeclarationListNode;
  }
}
