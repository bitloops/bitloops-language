import { EntityEvaluationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EntityEvaluationBuilder.js';
import { EntityEvaluationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EntityEvaluation.js';
import { EvaluationFieldListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { DomainEvaluationBuilderDirector } from './index.js';

export class EntityEvaluationBuilderDirector {
  buildEntityEvaluationWithFieldList(
    entityName: string,
    fieldListNode: EvaluationFieldListNode,
  ): EntityEvaluationNode {
    const domainEvaluation =
      new DomainEvaluationBuilderDirector().buildDomainEvaluationWithFieldListProps(
        entityName,
        fieldListNode,
      );
    const entityEvaluationNode = new EntityEvaluationNodeBuilder()
      .withDomainEvaluation(domainEvaluation)
      .build();
    return entityEvaluationNode;
  }

  buildEntityEvaluationWithExpression(
    entityName: string,
    expressionNode: ExpressionNode,
  ): EntityEvaluationNode {
    const domainEvaluation =
      new DomainEvaluationBuilderDirector().buildDomainEvaluationWithExpressionProps(
        entityName,
        expressionNode,
      );
    const entityEvaluationNode = new EntityEvaluationNodeBuilder()
      .withDomainEvaluation(domainEvaluation)
      .build();
    return entityEvaluationNode;
  }
}
