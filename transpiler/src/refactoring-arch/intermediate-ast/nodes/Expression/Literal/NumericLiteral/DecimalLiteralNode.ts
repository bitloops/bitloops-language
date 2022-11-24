import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../../IntermediateASTNode.js';
import { NumericLiteralNode } from './NumericLiteral.js';

const NAME = 'decimalLiteral';
export class DecimalLiteralNode extends NumericLiteralNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = NAME;
    this.nodeType = BitloopsTypesMapping.TDecimalLiteral;
  }
}
