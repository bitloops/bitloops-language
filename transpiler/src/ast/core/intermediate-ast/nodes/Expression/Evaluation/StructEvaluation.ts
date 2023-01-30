import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class StructEvaluationNode extends EvaluationNode {
  private static structEvaluationNodeName = 'struct';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TStructEvaluation;
    this.classNodeName = StructEvaluationNode.structEvaluationNodeName;
  }
}
