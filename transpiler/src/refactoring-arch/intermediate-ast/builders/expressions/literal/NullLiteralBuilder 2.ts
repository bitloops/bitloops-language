import { NullLiteralNode } from '../../../nodes/Expression/Literal/NullLiteralNode.js';
import { IBuilder } from '../../IBuilder.js';

export class BooleanLiteralBuilder implements IBuilder<NullLiteralNode> {
  //   public readonly NAME = 'nullLiteral';

  private nullLiteralNode: NullLiteralNode;

  constructor() {
    this.nullLiteralNode = new NullLiteralNode();
  }

  public build(): NullLiteralNode {
    this.nullLiteralNode.setValue('null');

    return this.nullLiteralNode;
  }
}
