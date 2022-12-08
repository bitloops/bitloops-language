import { EntityIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { EntityEvaluationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EntityEvaluationBuilder.js';
import { EntityEvaluationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EntityEvaluation.js';
import { EvaluationFieldListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { TEntityIdentifier } from '../../../../../../src/types.js';
import { DomainEvaluationBuilderDirector } from './index.js';

export class EntityEvaluationBuilderDirector {
  buildEntityEvaluationWithFieldList(
    entityName: TEntityIdentifier,
    fieldListNode: EvaluationFieldListNode,
  ): EntityEvaluationNode {
    const domainEvaluation =
      new DomainEvaluationBuilderDirector().buildDomainEvaluationWithFieldListProps(
        new EntityIdentifierNodeBuilder().withName(entityName).build(),
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
        new EntityIdentifierNodeBuilder().withName(entityName).build(),
        expressionNode,
      );
    const entityEvaluationNode = new EntityEvaluationNodeBuilder()
      .withDomainEvaluation(domainEvaluation)
      .build();
    return entityEvaluationNode;
  }
}
