import { DomainEvaluationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationNodeBuilder.js';
import { DomainEvaluationPropsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationPropsNodeBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { NameNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/NameBuilder.js';
import { DomainEvaluationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { EvaluationFieldListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';

export class DomainEvaluationBuilderDirector {
  buildDomainEvaluationWithFieldListProps(
    domainName: string,
    fieldListNode: EvaluationFieldListNode,
  ): DomainEvaluationNode {
    const nameNode = new NameNodeBuilder().withName(domainName).build();
    EvaluationFieldListNodeBuilder;
    const domainEvaluationPropsNode = new DomainEvaluationPropsNodeBuilder()
      .withEvaluationFieldList(fieldListNode)
      .build();
    const domainEvaluation = new DomainEvaluationNodeBuilder()
      .withName(nameNode)
      .withProps(domainEvaluationPropsNode)
      .build();
    return domainEvaluation;
  }

  buildDomainEvaluationWithExpressionProps(
    domainName: string,
    expressionNode: ExpressionNode,
  ): DomainEvaluationNode {
    const nameNode = new NameNodeBuilder().withName(domainName).build();
    EvaluationFieldListNodeBuilder;
    const domainEvaluationPropsNode = new DomainEvaluationPropsNodeBuilder()
      .withExpression(expressionNode)
      .build();
    const domainEvaluation = new DomainEvaluationNodeBuilder()
      .withName(nameNode)
      .withProps(domainEvaluationPropsNode)
      .build();
    return domainEvaluation;
  }
}
