import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

const NAME = 'arrayPrimaryType';

export class ArrayPrimaryTypeNode extends BitloopsPrimaryTypeNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.ArrayBitloopsPrimType, { lines }, NAME);
  }
}
