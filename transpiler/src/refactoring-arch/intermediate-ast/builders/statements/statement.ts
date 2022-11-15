import { TIfStatement, TStatements, TExpression } from '../../../../types.js';
import { IBuilder } from '../IBuilder.js';

export interface IIfStatementBuilder extends IBuilder<TIfStatement> {
  withCondition(condition: TExpression): IIfStatementBuilder;
  withThenStatements(thenStatements: TStatements): IIfStatementBuilder;
  withElseStatements(elseStatements: TStatements): IIfStatementBuilder;
}

export class StatementDirector {
  private ifBuilder: IIfStatementBuilder;

  constructor(ifBuilder: IIfStatementBuilder) {
    this.ifBuilder = ifBuilder;
  }

  buildIfStatement(
    condition: TExpression,
    thenStatements: TStatements,
    elseStatements: TStatements,
  ): TIfStatement {
    const ifStatement = this.ifBuilder
      .withCondition(condition)
      .withThenStatements(thenStatements)
      .withElseStatements(elseStatements)
      .build();
    return ifStatement;
  }
}

export class IfStatementBuilder implements IIfStatementBuilder {
  private condition: TExpression;
  private thenStatements: TStatements;
  private elseStatements?: TStatements;

  withCondition(condition: TExpression): IIfStatementBuilder {
    this.condition = condition;
    return this;
  }

  withThenStatements(thenStatements: TStatements): IIfStatementBuilder {
    this.thenStatements = thenStatements;
    return this;
  }

  withElseStatements(elseStatements: TStatements): IIfStatementBuilder {
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
