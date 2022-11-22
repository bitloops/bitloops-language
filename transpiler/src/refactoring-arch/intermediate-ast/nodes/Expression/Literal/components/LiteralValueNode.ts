import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../../../IntermediateASTNode.js';

const NAME = 'value';

export class LiteralValueNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TLiteralValue, { lines }, NAME);
  }
}
