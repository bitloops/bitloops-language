import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { evaluationFieldsKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';

export class EvaluationFieldListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEvaluationFields, metadata, evaluationFieldsKey);
  }
}
