import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { ArgumentNode } from '../../nodes/ArgumentList/ArgumentNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class ArgumentListNodeBuilder implements IBuilder<ArgumentListNode> {
  private argumentListNode: ArgumentListNode;
  private argumentNodes: ArgumentNode[];

  constructor(metadata?: TNodeMetadata) {
    this.argumentListNode = new ArgumentListNode(metadata);
  }

  public withArguments(arguments_: ArgumentNode[]): ArgumentListNodeBuilder {
    this.argumentNodes = arguments_;
    return this;
  }

  public build(): ArgumentListNode {
    this.argumentNodes.forEach((argumentNode) => {
      this.argumentListNode.addChild(argumentNode);
    });
    this.argumentListNode.buildArrayValue();

    return this.argumentListNode;
  }
}
