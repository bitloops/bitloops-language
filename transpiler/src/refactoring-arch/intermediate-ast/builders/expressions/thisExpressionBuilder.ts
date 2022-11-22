import { ThisExpressionNode } from '../../nodes/Expression/ThisExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class MethodCallNodeBuilder implements IBuilder<ThisExpressionNode> {
  public readonly NAME = 'MethodCallExpression';

  private thisExpressionNode: ThisExpressionNode;

  constructor() {
    this.thisExpressionNode = new ThisExpressionNode();
  }

  public build(): ThisExpressionNode {
    this.thisExpressionNode.setValue('this');

    return this.thisExpressionNode;
  }
}
