import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { BreakStatementNode } from '../../nodes/statements/BreakStatementNode.js';
import { IBuilder } from '../IBuilder.js';

export class BreakStatementNodeBuilder implements IBuilder<BreakStatementNode> {
  private breakNode: BreakStatementNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.breakNode = new BreakStatementNode(nodeMetadata);
  }

  public build(): BreakStatementNode {
    this.breakNode.buildLeafValue('break');

    return this.breakNode;
  }
}
