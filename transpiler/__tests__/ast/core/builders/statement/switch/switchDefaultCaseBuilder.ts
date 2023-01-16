import { IBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TDefaultCase, TStatement } from '../../../../../../src/types.js';

export class SwitchDefaultCaseBuilder implements IBuilder<TDefaultCase> {
  private statements: TStatement[];

  withStatement(statement: TStatement): SwitchDefaultCaseBuilder {
    if (!this.statements) {
      this.statements = [];
    }
    this.statements.push(statement);
    return this;
  }

  build(): TDefaultCase {
    const switchStatement: TDefaultCase = {
      statements: this.statements,
    };
    return switchStatement;
  }
}
