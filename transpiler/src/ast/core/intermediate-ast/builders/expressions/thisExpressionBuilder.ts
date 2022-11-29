import { ThisExpressionNode } from '../../nodes/Expression/ThisExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class ThisExpressionNodeBuilder implements IBuilder<ThisExpressionNode> {
  private thisExpressionNode: ThisExpressionNode;

  constructor() {
    this.thisExpressionNode = new ThisExpressionNode();
  }

  public build(): ThisExpressionNode {
    this.thisExpressionNode.buildLeafValue('this');

    return this.thisExpressionNode;
  }
}
