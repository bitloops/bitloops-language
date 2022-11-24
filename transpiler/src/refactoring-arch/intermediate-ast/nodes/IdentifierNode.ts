import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'identifier';
export class IdentifierNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TIdentifier, { lines }, NAME);
  }
}
