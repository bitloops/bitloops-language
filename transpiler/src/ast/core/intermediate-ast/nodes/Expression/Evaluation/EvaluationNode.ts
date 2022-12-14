import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ErrorEvaluationNode } from './ErrorEvaluation.js';

export class EvaluationNode extends ExpressionNode {
  private static evaluationNodeName = 'evaluation';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = EvaluationNode.evaluationNodeName;
    this.nodeType = BitloopsTypesMapping.TEvaluation;
  }

  isErrorEvaluation(): this is ErrorEvaluationNode {
    return this.getNodeType() === BitloopsTypesMapping.TErrorEvaluation;
  }
}
