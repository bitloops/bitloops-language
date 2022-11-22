import { StringLiteralNode } from '../../../nodes/Expression/Literal/StringLiteralNode.js';
import { IBuilder } from '../../IBuilder.js';

export class StringLiteralBuilder implements IBuilder<StringLiteralNode> {
  //   public readonly NAME = 'stringLiteral';

  private strValue: string;
  private stringLiteralNode: StringLiteralNode;

  constructor() {
    this.stringLiteralNode = new StringLiteralNode();
  }

  public withValue(strValue: string): StringLiteralBuilder {
    this.strValue = strValue;
    return this;
  }

  public build(): StringLiteralNode {
    this.stringLiteralNode.setValue(this.strValue);

    return this.stringLiteralNode;
  }
}
