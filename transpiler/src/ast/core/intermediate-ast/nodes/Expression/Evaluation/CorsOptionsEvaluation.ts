import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class CorsOptionsEvaluationNode extends EvaluationNode {
  private static corsKeyName = 'corsOptions';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TCorsOptionsEvaluation;
    this.classNodeName = CorsOptionsEvaluationNode.corsKeyName;
  }
}
