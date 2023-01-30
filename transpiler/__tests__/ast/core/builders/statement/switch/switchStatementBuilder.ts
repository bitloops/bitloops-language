import { IBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDefaultCase,
  TExpression,
  TRegularCase,
  TSwitchStatement,
} from '../../../../../../src/types.js';

export class SwitchStatementBuilder implements IBuilder<TSwitchStatement> {
  private expression: TExpression;
  private cases: TRegularCase[];
  private defaultCase: TDefaultCase;

  withExpression(expression: TExpression): SwitchStatementBuilder {
    this.expression = expression;
    return this;
  }
  withRegularCases(regularCases: TRegularCase[]): SwitchStatementBuilder {
    this.cases = regularCases;
    return this;
  }

  withRegularCase(regularCase: TRegularCase): SwitchStatementBuilder {
    if (!this.cases) {
      this.cases = [];
    }
    this.cases.push(regularCase);
    return this;
  }

  withDefaultClause(defClause: TDefaultCase): SwitchStatementBuilder {
    this.defaultCase = defClause;
    return this;
  }

  build(): TSwitchStatement {
    const switchStatement: TSwitchStatement = {
      switchStatement: {
        cases: this.cases,
        defaultCase: this.defaultCase,
        ...this.expression,
      },
    };
    return switchStatement;
  }
}
