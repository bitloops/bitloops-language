import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'fieldList';

export class FieldListNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TVariables, { lines }, NAME);
  }
}
