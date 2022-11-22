import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { ArgumentNode } from '../../nodes/ArgumentList/ArgumentNode.js';
import { IBuilder } from '../IBuilder.js';

export class ArgumentListNodeBuilder implements IBuilder<ArgumentListNode> {
  private argumentListNode: ArgumentListNode;
  private argumentNodes: ArgumentNode[];

  constructor() {
    this.argumentListNode = new ArgumentListNode();
  }

  public withArguments(_arguments: ArgumentNode[]): ArgumentListNodeBuilder {
    this.argumentNodes = _arguments;
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
