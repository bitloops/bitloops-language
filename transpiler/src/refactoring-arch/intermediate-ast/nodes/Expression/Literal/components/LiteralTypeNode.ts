import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../../../IntermediateASTNode.js';

const NAME = 'type';

export class LiteralTypeNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TLiteralType, { lines }, NAME);
  }
}
