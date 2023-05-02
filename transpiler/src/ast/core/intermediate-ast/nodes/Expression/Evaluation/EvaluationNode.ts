import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ErrorEvaluationNode } from './ErrorEvaluation.js';
import { TInferredTypes } from '../../../../../../semantic-analysis/type-inference/types.js';
import { IdentifierNode } from '../../identifier/IdentifierNode.js';

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
  isDomainServiceEvaluation(): boolean {
    return this.getNodeType() === BitloopsTypesMapping.TDomainServiceEvaluation;
  }
  isEntityEvaluation(): boolean {
    return this.getNodeType() === BitloopsTypesMapping.TEntityEvaluation;
  }
  getEvaluationChild(): EvaluationNode {
    return this.getChildren()[0] as EvaluationNode;
  }

  getIdentifierNode(): IdentifierNode {
    return this.getChildNodeByType<IdentifierNode>(BitloopsTypesMapping.TIdentifier);
  }

  public getInferredType(): TInferredTypes {
    for (const child of this.getChildren()) {
      if (child instanceof EvaluationNode) {
        return child.getInferredType();
      }
    }
    throw new Error('No evaluation found to infer type');
  }
}
