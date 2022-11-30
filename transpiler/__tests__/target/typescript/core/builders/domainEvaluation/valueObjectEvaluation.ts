import { ValueObjectEvaluationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/ValueObjectEvaluationBuilder.js';
import { EvaluationFieldListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { ValueObjectEvaluationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/ValueObjectEvaluation.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { DomainEvaluationBuilderDirector } from './index.js';

export class ValueObjectEvaluationBuilderDirector {
  buildValueObjectEvaluationWithFieldList(
    valueObjectName: string,
    fieldListNode: EvaluationFieldListNode,
  ): ValueObjectEvaluationNode {
    const domainEvaluation =
      new DomainEvaluationBuilderDirector().buildDomainEvaluationWithFieldListProps(
        valueObjectName,
        fieldListNode,
      );
    const valueObjectNameEvaluationNode = new ValueObjectEvaluationNodeBuilder()
      .withDomainEvaluation(domainEvaluation)
      .build();
    return valueObjectNameEvaluationNode;
  }

  buildValueObjectEvaluationWithExpression(
    valueObjectName: string,
    expressionNode: ExpressionNode,
  ): ValueObjectEvaluationNode {
    const domainEvaluation =
      new DomainEvaluationBuilderDirector().buildDomainEvaluationWithExpressionProps(
        valueObjectName,
        expressionNode,
      );
    const valueObjectNameEvaluationNode = new ValueObjectEvaluationNodeBuilder()
      .withDomainEvaluation(domainEvaluation)
      .build();
    return valueObjectNameEvaluationNode;
  }
}
