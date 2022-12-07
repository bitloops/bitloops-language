import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TIfStatement, TExpression, TStatements } from '../../../../../src/types.js';

export class IfStatementBuilder implements IBuilder<TIfStatement> {
  private condition: TExpression;
  private thenStatements: TStatements;
  private elseStatements?: TStatements;

  withCondition(condition: TExpression): IfStatementBuilder {
    this.condition = condition;
    return this;
  }
  withThenStatements(thenStatements: TStatements): IfStatementBuilder {
    this.thenStatements = thenStatements;
    return this;
  }

  withElseStatements(elseStatements: TStatements): IfStatementBuilder {
    this.elseStatements = elseStatements;
    return this;
  }

  build(): TIfStatement {
    const ifStatement: TIfStatement = {
      ifStatement: {
        condition: this.condition,
        thenStatements: this.thenStatements,
      },
    };
    if (this.elseStatements) {
      ifStatement.ifStatement.elseStatements = this.elseStatements;
    }
    return ifStatement;
  }
}
