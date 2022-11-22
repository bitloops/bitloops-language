import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { NumericLiteralNode } from './NumericLiteral.js';

const NAME = 'DecimalLiteral';
export class DecimalLiteralNode extends NumericLiteralNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TDecimalLiteral, { lines: lines! }, NAME);
  }
}
