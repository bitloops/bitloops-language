import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../../IntermediateASTNode.js';
import { EvaluationNode } from '../EvaluationNode.js';

export class DomainEvaluationNode extends EvaluationNode {
  private static domainEvaluationNodeName = 'domainEvaluation';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TDomainEvaluation;
    this.classNodeName = DomainEvaluationNode.domainEvaluationNodeName;
  }
}
