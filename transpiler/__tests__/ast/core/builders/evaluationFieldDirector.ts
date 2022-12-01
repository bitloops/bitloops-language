import { TEvaluationField, TExpression } from '../../../../src/types.js';
import { ExpressionBuilderDirector } from './expressionDirector.js';

export class EvaluationFieldBuilderDirector {
  buildEvaluationField(identifier: string, expression: TExpression): TEvaluationField {
    return {
      evaluationField: {
        name: identifier,
        ...expression,
      },
    };
  }

  buildStringEvaluationField(identifier: string, stringLiteral: string): TEvaluationField {
    return this.buildEvaluationField(
      identifier,
      new ExpressionBuilderDirector().buildStringLiteralExpression(stringLiteral),
    );
  }

  buildIntEvaluationField(identifier: string, int32Literal: number): TEvaluationField {
    return this.buildEvaluationField(
      identifier,
      new ExpressionBuilderDirector().buildInt32LiteralExpression(int32Literal),
    );
  }
}
