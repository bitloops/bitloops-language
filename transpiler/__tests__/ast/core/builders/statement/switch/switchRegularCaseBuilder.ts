import { IBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TExpression, TRegularCase, TStatement } from '../../../../../../src/types.js';

export class SwitchRegularCaseBuilder implements IBuilder<TRegularCase> {
  private expression: TExpression;
  private statements: TStatement[];

  withExpression(expression: TExpression): SwitchRegularCaseBuilder {
    this.expression = expression;
    return this;
  }
  withStatement(statement: TStatement): SwitchRegularCaseBuilder {
    if (!this.statements) {
      this.statements = [];
    }
    this.statements.push(statement);
    return this;
  }

  build(): TRegularCase {
    const switchStatement: TRegularCase = {
      regularCase: {
        statements: this.statements,
        ...this.expression,
      },
    };
    return switchStatement;
  }
}
