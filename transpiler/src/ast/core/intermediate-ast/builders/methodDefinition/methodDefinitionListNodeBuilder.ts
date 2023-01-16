import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { MethodDefinitionListNode } from '../../nodes/method-definitions/MethodDefinitionListNode.js';
import { MethodDefinitionNode } from '../../nodes/method-definitions/MethodDefinitionNode.js';
import { IBuilder } from '../IBuilder.js';

export class MethodDefinitionListNodeBuilder implements IBuilder<MethodDefinitionListNode> {
  private methodDefinitionListNode: MethodDefinitionListNode;
  private methodDefinitionNodes: MethodDefinitionNode[];

  constructor(metadata?: TNodeMetadata) {
    this.methodDefinitionListNode = new MethodDefinitionListNode(metadata);
  }

  public withMethodDefinitions(
    methodDefinitions: MethodDefinitionNode[],
  ): MethodDefinitionListNodeBuilder {
    this.methodDefinitionNodes = methodDefinitions;
    return this;
  }

  public build(): MethodDefinitionListNode {
    if (this.methodDefinitionNodes) {
      this.methodDefinitionNodes.forEach((methodDefinitionNode) => {
        this.methodDefinitionListNode.addChild(methodDefinitionNode);
      });
    }
    this.methodDefinitionListNode.buildArrayValue();

    return this.methodDefinitionListNode;
  }
}
