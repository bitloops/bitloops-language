import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

const NAME = 'bitloopsIdentifierType';

export class BitloopsIdentifierTypeNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TBitloopsIdentifier, { lines }, NAME);
  }
}
