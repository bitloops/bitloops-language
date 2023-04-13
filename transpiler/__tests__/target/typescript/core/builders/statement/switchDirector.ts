import { DefaultSwitchCaseNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/switchStatement/DefaultSwitchCaseBuilder.js';
import { SwitchCasesBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/switchStatement/SwitchCasesBuilder.js';
import { SwitchRegularCaseBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/switchStatement/SwitchRegularCaseBuilder.js';
import { SwitchStatementNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/switchStatement/SwitchStatementNodeBuilder.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { StatementListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/StatementList.js';
import { DefaultSwitchCaseNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/SwitchStatement/DefaultSwitchCase.js';
import { SwitchRegularCaseNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/SwitchStatement/SwitchCase.js';
import { SwitchCaseListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/SwitchStatement/SwitchCases.js';
import { SwitchStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/SwitchStatement/SwitchStatementNode.js';

type TRegularCases = Array<{
  expression: ExpressionNode;
  statementList: StatementListNode;
}>;

export class SwitchStatementBuilderDirector {
  buildSwitchStatement(
    condition: ExpressionNode,
    cases: TRegularCases,
    defaultCaseStatements?: StatementListNode,
  ): SwitchStatementNode {
    const switchCaseNode = new SwitchStatementNodeBuilder(null)
      .withCases(this.buildCaseClausesVisitor(cases))
      .withExpression(condition);
    if (defaultCaseStatements) {
      switchCaseNode.withDefaultCase(this.defaultClauseVisitor(defaultCaseStatements));
    }
    return switchCaseNode.build();
  }

  buildCaseClausesVisitor = (regularCases: TRegularCases): SwitchCaseListNode => {
    const switchCases = regularCases.map(this.caseClauseVisitor);
    return new SwitchCasesBuilder(null).withRegularCases(switchCases).build();
  };

  caseClauseVisitor = (param: {
    expression: ExpressionNode;
    statementList: StatementListNode;
  }): SwitchRegularCaseNode => {
    const { expression, statementList } = param;
    return new SwitchRegularCaseBuilder(null)
      .withExpression(expression)
      .withStatements(statementList)
      .build();
  };

  defaultClauseVisitor = (statementList: StatementListNode): DefaultSwitchCaseNode => {
    return new DefaultSwitchCaseNodeBuilder(null).withStatements(statementList).build();
  };
}
