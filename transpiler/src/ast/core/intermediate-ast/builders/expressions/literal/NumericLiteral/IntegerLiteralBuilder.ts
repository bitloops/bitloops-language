import { LiteralTypeNode } from '../../../../nodes/Expression/Literal/components/LiteralTypeNode.js';
import { LiteralValueNode } from '../../../../nodes/Expression/Literal/components/LiteralValueNode.js';
import { IntegerLiteralNode } from '../../../../nodes/Expression/Literal/NumericLiteral/IntegerLiteralNode.js';
import { TNodeMetadata } from '../../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class IntegerLiteralBuilder implements IBuilder<IntegerLiteralNode> {
  //   public readonly NAME = 'integerLiteral';
  private type: LiteralTypeNode;
  private value: LiteralValueNode;
  private integerLiteralNode: IntegerLiteralNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.integerLiteralNode = new IntegerLiteralNode(nodeMetadata);
  }

  public withType(literalType: LiteralTypeNode): IntegerLiteralBuilder {
    this.type = literalType;
    return this;
  }

  public withValue(literalValue: LiteralValueNode): IntegerLiteralBuilder {
    this.value = literalValue;
    return this;
  }

  public build(): IntegerLiteralNode {
    this.integerLiteralNode.addChild(this.type);
    this.integerLiteralNode.addChild(this.value);

    this.integerLiteralNode.buildObjectValue();

    return this.integerLiteralNode;
  }
}
