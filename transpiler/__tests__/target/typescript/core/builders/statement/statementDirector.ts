import { BreakStatementNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/BreakStatement.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { ConstDeclarationBuilderDirector } from './constDeclaration.js';
import { IfStatementBuilderDirector } from './ifStatementDirector.js';

export class StatementBuilderDirector {
  /**
   *  const {identifier} = [await]? this.useCase.execute();
   */
  buildConstDeclarationThisUseCaseExecute(
    identifier: string,
    options?: { await: boolean },
  ): ConstDeclarationNode {
    return new ConstDeclarationBuilderDirector().buildConstDeclarationThisUseCaseExecute(
      identifier,
      options,
    );
  }

  buildIfStatement(
    condition: ExpressionNode,
    thenStatements: StatementNode[],
    elseStatements?: StatementNode[],
  ): IfStatementNode {
    return new IfStatementBuilderDirector().buildIfStatement(
      condition,
      thenStatements,
      elseStatements,
    );
  }

  buildBreakStatement(): StatementNode {
    return new BreakStatementNodeBuilder().build();
  }
}
