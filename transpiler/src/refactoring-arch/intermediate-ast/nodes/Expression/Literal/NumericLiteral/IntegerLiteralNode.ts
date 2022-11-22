import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { NumericLiteralNode } from './NumericLiteral.js';

const NAME = 'IntegerLiteral';
export class IntegerLiteralNode extends NumericLiteralNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TIntegerLiteral, { lines: lines! }, NAME);
  }
}
