import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

const NAME = 'bitloopsIdentifierType';

export class BitloopsIdentifierTypeNode extends BitloopsPrimaryTypeNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TBitloopsIdentifier, { lines }, NAME);
  }
}
