import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

const NAME = 'entity';
export class EntityEvaluationNode extends EvaluationNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TEntityEvaluation;
    this.classNodeName = NAME;
  }
}
