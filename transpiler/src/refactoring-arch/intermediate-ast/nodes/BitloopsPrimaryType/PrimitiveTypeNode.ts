import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

const NAME = 'primitiveType';

export class PrimitiveTypeNode extends BitloopsPrimaryTypeNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TBitloopsPrimitives, { lines }, NAME);
  }
}
