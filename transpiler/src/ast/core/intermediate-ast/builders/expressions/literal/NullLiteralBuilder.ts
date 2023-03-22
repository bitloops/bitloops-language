import { NullLiteralNode } from '../../../nodes/Expression/Literal/NullLiteralNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class NullLiteralBuilder implements IBuilder<NullLiteralNode> {
  //   public readonly NAME = 'nullLiteral';

  private nullLiteralNode: NullLiteralNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.nullLiteralNode = new NullLiteralNode(nodeMetadata);
  }

  public build(): NullLiteralNode {
    this.nullLiteralNode.buildLeafValue('null');

    return this.nullLiteralNode;
  }
}
