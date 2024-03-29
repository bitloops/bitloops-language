import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { bitloopsPrimitivesObj } from '../../../../../../types.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { LiteralNode } from './LiteralNode.js';

const NAME = 'regexLiteral';
export class RegexLiteralNode extends LiteralNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TRegexLiteral;
    this.classNodeName = NAME;
  }

  getInferredType(): string {
    return bitloopsPrimitivesObj.regex;
  }

  static getLiteralType(type: string): string {
    const literalValue = {
      test: bitloopsPrimitivesObj.bool,
    };

    return literalValue[type];
  }
}
