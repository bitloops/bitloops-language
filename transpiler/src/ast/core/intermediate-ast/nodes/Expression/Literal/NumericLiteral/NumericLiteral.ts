import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../../IntermediateASTNode.js';
import { LiteralNode } from '../LiteralNode.js';

const name = 'numericLiteral';
export class NumericLiteralNode extends LiteralNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = name;
    this.nodeType = BitloopsTypesMapping.TNumericLiteral;
  }
}
