import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'field';

export class FieldNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TVariable, { lines }, NAME);
  }
}
