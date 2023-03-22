import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class EntityEvaluationNode extends EvaluationNode {
  private static entityNodeName = 'entity';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TEntityEvaluation;
    this.classNodeName = EntityEvaluationNode.entityNodeName;
  }
}
