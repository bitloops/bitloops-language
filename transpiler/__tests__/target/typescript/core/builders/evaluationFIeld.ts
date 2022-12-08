import { EvaluationFieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { ExpressionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { EvaluationFieldNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldNodeBuilder.js';
import { ExpressionBuilderDirector } from './expression.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';

export class EvaluationFieldBuilderDirector {
  buildEvaluationField(name: string, expression: ExpressionNode): EvaluationFieldNode {
    const identifierNode = new IdentifierNodeBuilder().withName(name).build();

    const evaluationFieldNode = new EvaluationFieldNodeBuilder()
      .withIdentifier(identifierNode)
      .withExpression(expression)
      .build();

    return evaluationFieldNode;
  }

  buildStringLiteralEvaluationField(name: string, value: string): EvaluationFieldNode {
    const stringExpression = new ExpressionBuilderDirector().buildStringLiteralExpression(value);
    return this.buildEvaluationField(name, stringExpression);
  }

  buildInt32LiteralEvaluationField(name: string, value: number): EvaluationFieldNode {
    const int32Expression = new ExpressionBuilderDirector().buildInt32LiteralExpression(value);
    return this.buildEvaluationField(name, int32Expression);
  }
}
