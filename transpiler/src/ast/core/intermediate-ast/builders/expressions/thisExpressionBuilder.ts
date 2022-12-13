import { ThisExpressionNode } from '../../nodes/Expression/ThisExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class ThisExpressionNodeBuilder implements IBuilder<ThisExpressionNode> {
  private thisExpressionNode: ThisExpressionNode;

  constructor() {
    this.thisExpressionNode = new ThisExpressionNode();
  }

  /**
   *
   * @param customValue used in the case of 'await this'
   */
  public build(customValue?: string): ThisExpressionNode {
    this.thisExpressionNode.buildLeafValue(customValue ?? 'this');

    return this.thisExpressionNode;
  }
}
