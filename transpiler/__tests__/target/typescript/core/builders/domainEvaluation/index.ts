import { DomainEvaluationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationNodeBuilder.js';
import { DomainEvaluationPropsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationPropsNodeBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { EntityIdentifierNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Entity/EntityIdentifierNode.js';
import { DomainEvaluationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { EvaluationFieldListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ValueObjectIdentifierNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/valueObject/ValueObjectIdentifierNode.js';

export class DomainEvaluationBuilderDirector {
  buildDomainEvaluationWithFieldListProps(
    identifierNode: EntityIdentifierNode | ValueObjectIdentifierNode,
    fieldListNode: EvaluationFieldListNode,
  ): DomainEvaluationNode {
    EvaluationFieldListNodeBuilder;
    const domainEvaluationPropsNode = new DomainEvaluationPropsNodeBuilder()
      .withEvaluationFieldList(fieldListNode)
      .build();
    const domainEvaluation = new DomainEvaluationNodeBuilder()
      .withIdentifier(identifierNode)
      .withProps(domainEvaluationPropsNode)
      .build();
    return domainEvaluation;
  }

  buildDomainEvaluationWithExpressionProps(
    identifierNode: EntityIdentifierNode | ValueObjectIdentifierNode,
    expressionNode: ExpressionNode,
  ): DomainEvaluationNode {
    EvaluationFieldListNodeBuilder;
    const domainEvaluationPropsNode = new DomainEvaluationPropsNodeBuilder()
      .withExpression(expressionNode)
      .build();
    const domainEvaluation = new DomainEvaluationNodeBuilder()
      .withIdentifier(identifierNode)
      .withProps(domainEvaluationPropsNode)
      .build();
    return domainEvaluation;
  }
}
