import { RegexLiteralNode } from '../../../nodes/Expression/Literal/RegexLiteralNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class RegexLiteralNodeBuilder implements IBuilder<RegexLiteralNode> {
  private regexValue: string;
  private regexLiteralNode: RegexLiteralNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.regexLiteralNode = new RegexLiteralNode(nodeMetadata);
  }

  public withValue(strValue: string): RegexLiteralNodeBuilder {
    this.regexValue = strValue;
    return this;
  }

  public build(): RegexLiteralNode {
    this.regexLiteralNode.buildLeafValue(this.regexValue);

    return this.regexLiteralNode;
  }
}
