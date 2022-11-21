import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

const NAME = 'primitiveType';

export class PrimitiveTypeNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TBitloopsPrimitives, { lines }, NAME);
  }
}
