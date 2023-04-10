import { TForStatement } from '../../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../../expressionDirector.js';
import { VariableDeclarationBuilderDirector } from '../variableDeclarationDirector.js';
import { ForStatementBuilder } from './forStatementBuilder.js';

export class ForStatementDirector {
  private forStatementBuilder: ForStatementBuilder;
  constructor() {
    this.forStatementBuilder = new ForStatementBuilder();
  }

  /**
   * applyRules ( IsValidTitleRule ('title'))
   */
  buildForLoopWithoutBody(): TForStatement {
    return (
      this.forStatementBuilder
        .withBody([])
        .withCondition(
          new ExpressionBuilderDirector().buildRelationalExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('i'),
            new ExpressionBuilderDirector().buildInt32LiteralExpression(10),
            '<',
          ),
        )
        //   .withIncrement()
        .withVariableDeclaration(
          new VariableDeclarationBuilderDirector().buildVariableDeclarationWithFloatLiteralExpression(
            {
              name: 'i',
              type: 'float',
              numberExpression: 0,
            },
          ),
        )
        .build()
    );
  }
}
