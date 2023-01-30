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

  buildIdentifierEvaluationField(name: string, value: string): EvaluationFieldNode {
    const identifierExpression = new ExpressionBuilderDirector().buildIdentifierExpression(value);
    return this.buildEvaluationField(name, identifierExpression);
  }

  buildBooleanLiteralEvaluationField(name: string, value: boolean): EvaluationFieldNode {
    const booleanLiteralExpression = new ExpressionBuilderDirector().buildBooleanLiteralExpression(
      value,
    );
    return this.buildEvaluationField(name, booleanLiteralExpression);
  }

  buildStringLiteralEvaluationField(name: string, value: string): EvaluationFieldNode {
    const stringExpression = new ExpressionBuilderDirector().buildStringLiteralExpression(value);
    return this.buildEvaluationField(name, stringExpression);
  }

  buildInt32LiteralEvaluationField(name: string, value: number): EvaluationFieldNode {
    const int32Expression = new ExpressionBuilderDirector().buildInt32LiteralExpression(value);
    return this.buildEvaluationField(name, int32Expression);
  }
  buildMemberDotEvaluationField(name: string, ...members: string[]): EvaluationFieldNode {
    const expression = new ExpressionBuilderDirector().buildMemberDotOutOfVariables(...members);
    return this.buildEvaluationField(name, expression);
  }
}
