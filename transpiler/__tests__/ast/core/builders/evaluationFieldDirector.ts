import { TEvaluationField, TExpression } from '../../../../src/types.js';
import { ExpressionBuilderDirector } from './expressionDirector.js';

export class EvaluationFieldBuilderDirector {
  buildEvaluationField(identifier: string, expression: TExpression): TEvaluationField {
    return {
      evaluationField: {
        identifier,
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

  buildIdentifierEvaluationField(
    identifierName: string,
    identifierValue: string,
  ): TEvaluationField {
    return this.buildEvaluationField(
      identifierName,
      new ExpressionBuilderDirector().buildIdentifierExpression(identifierValue),
    );
  }

  buildMemberDotExpressionEvaluationField({
    identifierName,
    leftIdentifierValueName,
    rightIdentifierValueName,
  }: {
    identifierName: string;
    leftIdentifierValueName: string;
    rightIdentifierValueName: string;
  }): TEvaluationField {
    const memberDotExpression = new ExpressionBuilderDirector().buildMemberExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression(leftIdentifierValueName),
      rightIdentifierValueName,
    );
    return this.buildEvaluationField(identifierName, memberDotExpression);
  }
}
