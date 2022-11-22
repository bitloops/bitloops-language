import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../../../IntermediateASTNode.js';

const NAME = 'identifier';

export class LiteralTypeNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TLiteralType, { lines }, NAME);
  }
}
