import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { LiteralNode } from './LiteralNode.js';

const NAME = 'NullLiteral';
export class NullLiteralNode extends LiteralNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TNullLiteral, { lines: lines! }, NAME);
  }
}
