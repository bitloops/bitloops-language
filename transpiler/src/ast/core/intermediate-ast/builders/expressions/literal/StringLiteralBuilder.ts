import { StringLiteralNode } from '../../../nodes/Expression/Literal/StringLiteralNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class StringLiteralBuilder implements IBuilder<StringLiteralNode> {
  //   public readonly NAME = 'stringLiteral';

  private strValue: string;
  private stringLiteralNode: StringLiteralNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.stringLiteralNode = new StringLiteralNode(nodeMetadata);
  }

  public withValue(strValue: string): StringLiteralBuilder {
    this.strValue = strValue;
    return this;
  }

  public build(): StringLiteralNode {
    this.stringLiteralNode.buildLeafValue(this.strValue);

    return this.stringLiteralNode;
  }
}
