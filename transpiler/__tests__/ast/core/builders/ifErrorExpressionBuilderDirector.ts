import { TExpression, TIfErrorExpression } from '../../../../src/types.js';
import { AnonymousFunctionBuilder } from './AnonymousFunctionBuilder.js';
import { ExpressionBuilderDirector } from './expressionDirector.js';
import { IfErrorExpressionBuilder } from './ifErrorExpressionBuilder.js';
import { ParameterBuilderDirector } from './ParameterBuilderDirector.js';
import { ReturnStatementBuilder } from './statement/returnStatementBuilder.js';

export class IfErrorExpressionBuilderDirector {
  private builder: IfErrorExpressionBuilder;

  constructor() {
    this.builder = new IfErrorExpressionBuilder();
  }

  buildDefaultIfError(leftExpression: TExpression): TIfErrorExpression {
    return this.builder
      .withExpression(leftExpression)
      .withAnonymousFunction(
        new AnonymousFunctionBuilder()
          .withParameters({
            parameters: [new ParameterBuilderDirector().buildParameterWithoutType('err')],
          })
          .withArrowFunctionBody(
            new ReturnStatementBuilder()
              .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('err'))
              .build(),
          )
          .build(),
      )
      .build();
  }

  buildEmptyIfError(leftExpression: TExpression): TIfErrorExpression {
    return this.builder.withExpression(leftExpression).build();
  }
}
