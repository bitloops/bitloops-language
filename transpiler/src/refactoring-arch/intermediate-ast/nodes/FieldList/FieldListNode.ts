import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { fieldsKey } from '../../../../types.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

export class FieldListNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TVariables, { lines }, fieldsKey);
  }
}
