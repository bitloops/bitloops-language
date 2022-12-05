import { ConstDeclarationNode } from '../nodes/ConstDeclaration.js';
import { ConstDeclarationListNode } from '../nodes/ConstDeclarationListNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { IBuilder } from './IBuilder.js';

export class ConstDeclarationListNodeBuilder implements IBuilder<ConstDeclarationListNode> {
  private constantListNode: ConstDeclarationListNode;
  private constantNodes: ConstDeclarationNode[];

  constructor(metadata?: TNodeMetadata) {
    this.constantListNode = new ConstDeclarationListNode(metadata);
  }

  public withConstants(constantNodes: ConstDeclarationNode[]): ConstDeclarationListNodeBuilder {
    this.constantNodes = constantNodes;
    return this;
  }

  public build(): ConstDeclarationListNode {
    if (this.constantNodes) {
      this.constantNodes.forEach((constantNode) => {
        this.constantListNode.addChild(constantNode);
      });
    }
    this.constantListNode.buildArrayValue();

    return this.constantListNode;
  }
}
