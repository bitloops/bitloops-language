import { EvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationNode.js';

export class EvaluationBuilderDirector {
  buildStructEvaluation(): EvaluationNode {
    throw new Error('not implemented');
    // const expressionNode = new ExpressionBuilder()
    //   .withExpression(this.buildIdentifier(name))
    //   .build();
    // return expressionNode;
  }
}
