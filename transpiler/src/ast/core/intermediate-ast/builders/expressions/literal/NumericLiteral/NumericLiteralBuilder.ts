import { NumericLiteralNode } from '../../../../nodes/Expression/Literal/NumericLiteral/NumericLiteral.js';
import { IBuilder } from '../../../IBuilder.js';

export class NumericLiteralBuilder implements IBuilder<NumericLiteralNode> {
  private numericLiteralWrapper: NumericLiteralNode;
  private actualNumericLiteral: NumericLiteralNode;

  constructor() {
    this.numericLiteralWrapper = new NumericLiteralNode();
  }

  public withNumericLiteral(numericLit: NumericLiteralNode): NumericLiteralBuilder {
    this.actualNumericLiteral = numericLit;
    return this;
  }

  public build(): NumericLiteralNode {
    this.numericLiteralWrapper.addChild(this.actualNumericLiteral);

    this.numericLiteralWrapper.buildObjectValue();

    return this.numericLiteralWrapper;
  }
}
