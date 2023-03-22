import { TExpression, TArgument } from '../../../../src/types.js';
import { ExpressionBuilderDirector } from './expressionDirector.js';

export class ArgumentBuilderDirector {
  buildArgument(expression: TExpression): TArgument {
    return {
      argument: expression,
    };
  }

  buildStringArgument(stringLiteral: string): TArgument {
    return this.buildArgument(
      new ExpressionBuilderDirector().buildStringLiteralExpression(stringLiteral),
    );
  }

  buildIntArgument(int32Literal: number): TArgument {
    return this.buildArgument(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(int32Literal),
    );
  }

  buildIdentifierArgument(identifier: string): TArgument {
    return this.buildArgument(
      new ExpressionBuilderDirector().buildIdentifierExpression(identifier),
    );
  }
  buildMemberDotArgument(parts: string[]): TArgument {
    return this.buildArgument(
      new ExpressionBuilderDirector().buildMemberExpressionOutOfVariables(...parts),
    );
  }

  buildThisMemberDotArgument(parts: string[]): TArgument {
    return this.buildArgument(
      new ExpressionBuilderDirector().buildThisMemberExpressionOutOfVariables(...parts),
    );
  }
}
