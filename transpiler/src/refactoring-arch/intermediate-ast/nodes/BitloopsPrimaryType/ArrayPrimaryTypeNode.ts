import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

const NAME = 'arrayPrimaryType';

export class ArrayPrimaryTypeNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.ArrayBitloopsPrimType, { lines }, NAME);
  }
}
