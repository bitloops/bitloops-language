import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

const NAME = 'DTO';

export class DTONode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TDTO, { lines }, NAME);
  }
}
