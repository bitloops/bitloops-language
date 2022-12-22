import { BooleanLiteralNode } from '../../../nodes/Expression/Literal/BooleanLiteralNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class BooleanLiteralBuilder implements IBuilder<BooleanLiteralNode> {
  private booleanValue: string;
  private booleanLiteralNode: BooleanLiteralNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.booleanLiteralNode = new BooleanLiteralNode(nodeMetadata);
  }

  public withValue(booleanValue: string): BooleanLiteralBuilder {
    this.booleanValue = booleanValue;
    return this;
  }

  public build(): BooleanLiteralNode {
    this.booleanLiteralNode.buildLeafValue(this.booleanValue);

    return this.booleanLiteralNode;
  }
}
