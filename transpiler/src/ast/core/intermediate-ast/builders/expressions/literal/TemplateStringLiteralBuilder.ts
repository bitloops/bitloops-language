import { TemplateStringLiteralNode } from '../../../nodes/Expression/Literal/templateStringLiteralNode.js';
import { IBuilder } from '../../IBuilder.js';

export class TemplateStringLiteralBuilder implements IBuilder<TemplateStringLiteralNode> {
  //   public readonly NAME = 'stringLiteral';
  private value: string;
  private templateStringLiteralNode: TemplateStringLiteralNode;

  constructor() {
    this.templateStringLiteralNode = new TemplateStringLiteralNode();
  }

  public withValue(strValue: string): TemplateStringLiteralBuilder {
    this.value = strValue;
    return this;
  }

  public build(): TemplateStringLiteralNode {
    this.templateStringLiteralNode.buildLeafValue(this.value);

    return this.templateStringLiteralNode;
  }
}
