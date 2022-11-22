import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { LiteralNode } from './LiteralNode.js';

const NAME = 'StringLiteral';
export class StringLiteralNode extends LiteralNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TStringLiteral, { lines: lines! }, NAME);
  }
}
