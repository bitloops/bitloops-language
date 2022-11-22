import { LiteralTypeNode } from '../../../../nodes/Expression/Literal/components/LiteralTypeNode.js';
import { LiteralValueNode } from '../../../../nodes/Expression/Literal/components/LiteralValueNode.js';
import { DecimalLiteralNode } from '../../../../nodes/Expression/Literal/NumericLiteral/DecimalLiteralNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class DecimalLiteralBuilder implements IBuilder<DecimalLiteralNode> {
  //   public readonly NAME = 'decimalLiteral';

  private type: LiteralTypeNode;
  private value: LiteralValueNode;
  private decimalLiteralNode: DecimalLiteralNode;

  constructor() {
    this.decimalLiteralNode = new DecimalLiteralNode();
  }

  public withType(literalType: LiteralTypeNode): DecimalLiteralBuilder {
    this.type = literalType;
    return this;
  }

  public withValue(literalValue: LiteralValueNode): DecimalLiteralBuilder {
    this.value = literalValue;
    return this;
  }

  public build(): DecimalLiteralNode {
    this.decimalLiteralNode.addChild(this.type);
    this.decimalLiteralNode.addChild(this.value);

    this.decimalLiteralNode.buildObjectValue();

    return this.decimalLiteralNode;
  }
}
