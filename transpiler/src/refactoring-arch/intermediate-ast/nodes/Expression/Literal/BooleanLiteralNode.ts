import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { LiteralNode } from './LiteralNode.js';

const NAME = 'BooleanLiteral';
export class BooleanLiteralNode extends LiteralNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TBooleanLiteral, { lines: lines! }, NAME);
  }
}
