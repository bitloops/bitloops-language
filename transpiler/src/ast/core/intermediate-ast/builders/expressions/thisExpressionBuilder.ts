import { ThisExpressionNode } from '../../nodes/Expression/ThisExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class ThisExpressionNodeBuilder implements IBuilder<ThisExpressionNode> {
  private thisExpressionNode: ThisExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.thisExpressionNode = new ThisExpressionNode(metadata);
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
