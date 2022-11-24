import { StringLiteralNode as BooleanLiteralNode } from '../../../nodes/Expression/Literal/StringLiteralNode.js';
import { IBuilder } from '../../IBuilder.js';

export class BooleanLiteralBuilder implements IBuilder<BooleanLiteralNode> {
  //   public readonly NAME = 'booleanLiteral';

  private booleanValue: string;
  private booleanLiteralNode: BooleanLiteralNode;

  constructor() {
    this.booleanLiteralNode = new BooleanLiteralNode();
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
