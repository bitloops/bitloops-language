import { IBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExpression,
  TForStatement,
  TStatements,
  TVariableDeclaration,
} from '../../../../../../src/types.js';

export class ForStatementBuilder implements IBuilder<TForStatement> {
  private condition: TExpression;
  private increment: TExpression;
  private variableDeclaration: TVariableDeclaration;
  private body: TStatements;

  withCondition(condition: TExpression): ForStatementBuilder {
    this.condition = condition;
    return this;
  }
  withVariableDeclaration(variableDeclaration: TVariableDeclaration): ForStatementBuilder {
    this.variableDeclaration = variableDeclaration;
    return this;
  }

  withIncrement(increment: TExpression): ForStatementBuilder {
    this.increment = increment;
    return this;
  }

  withBody(body: TStatements): ForStatementBuilder {
    this.body = body;
    return this;
  }

  build(): TForStatement {
    const forStatement: TForStatement = {
      forStatement: {
        condition: this.condition,
        increment: this.increment,
        variable: this.variableDeclaration,
        statements: this.body,
      },
    };

    return forStatement;
  }
}
