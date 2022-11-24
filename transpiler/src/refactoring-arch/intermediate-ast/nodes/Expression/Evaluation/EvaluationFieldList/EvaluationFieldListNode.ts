import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { fieldsKey } from '../../../../../../types.js';
import { IntermediateASTNode } from '../../../IntermediateASTNode.js';

export class EvaluationFieldListNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TEvaluationFields, { lines }, fieldsKey);
  }
}
