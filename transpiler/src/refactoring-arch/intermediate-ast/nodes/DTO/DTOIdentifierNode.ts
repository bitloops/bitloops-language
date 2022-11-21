import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

const NAME = 'DTOIdentifier';
export class DTOIdentifierNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TDTOIdentifier, { lines }, NAME);
  }
}
