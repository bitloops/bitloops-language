import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class QueryEvaluationNode extends EvaluationNode {
  private static queryNodeName = 'query';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TQueryEvaluation;
    this.classNodeName = QueryEvaluationNode.queryNodeName;
  }
}
