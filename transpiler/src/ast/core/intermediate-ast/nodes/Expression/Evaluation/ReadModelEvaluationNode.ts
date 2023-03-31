import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class ReadModelEvaluationNode extends EvaluationNode {
  private static readModelNodeName = 'readModel';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TReadModelEvaluation;
    this.classNodeName = ReadModelEvaluationNode.readModelNodeName;
  }
}
