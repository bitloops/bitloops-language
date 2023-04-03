import { ReadModelEvaluationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/ReadModelEvaluationNodeBuilder.js';
import { ReadModelIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/readModel/ReadModelIdentifierNodeBuilder.js';
import { EvaluationFieldListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { ReadModelEvaluationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/ReadModelEvaluationNode.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { TReadModelIdentifier } from '../../../../../../src/types.js';
import { DomainEvaluationBuilderDirector } from './index.js';

export class ReadModelEvaluationBuilderDirector {
  buildReadModelEvaluationWithFieldList(
    readModelName: TReadModelIdentifier,
    fieldListNode: EvaluationFieldListNode,
  ): ReadModelEvaluationNode {
    const domainEvaluation =
      new DomainEvaluationBuilderDirector().buildDomainEvaluationWithFieldListProps(
        new ReadModelIdentifierNodeBuilder().withName(readModelName).build(),
        fieldListNode,
      );
    const readModelEvaluationNode = new ReadModelEvaluationNodeBuilder()
      .withDomainEvaluation(domainEvaluation)
      .build();
    return readModelEvaluationNode;
  }

  buildReadModelEvaluationWithExpression(
    readModelName: string,
    expressionNode: ExpressionNode,
  ): ReadModelEvaluationNode {
    const domainEvaluation =
      new DomainEvaluationBuilderDirector().buildDomainEvaluationWithExpressionProps(
        new ReadModelIdentifierNodeBuilder().withName(readModelName).build(),
        expressionNode,
      );
    const readModelEvaluationNode = new ReadModelEvaluationNodeBuilder()
      .withDomainEvaluation(domainEvaluation)
      .build();
    return readModelEvaluationNode;
  }
}
