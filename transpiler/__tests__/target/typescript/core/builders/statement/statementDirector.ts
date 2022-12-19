import { ReturnOKStatementNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ReturnOkStatamentNodeBuilder.js';
import { BreakStatementNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/BreakStatement.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { ReturnOKStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ReturnOKStatementNode.js';
import { EvaluationBuilderDirector } from '../evaluation.js';
import { ExpressionBuilderDirector } from '../expression.js';
import { ConstDeclarationBuilderDirector } from './constDeclaration.js';
import { IfStatementBuilderDirector } from './ifStatementDirector.js';
import { BreakStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/BreakStatementNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';

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

  buildBreakStatement(): BreakStatementNode {
    return new BreakStatementNodeBuilder().build();
  }

  buildReturnOKStatement(expression: ExpressionNode): ReturnOKStatementNode {
    return new ReturnOKStatementNodeBuilder().withExpression(expression).build();
  }

  buildExpressionEntityEvaluationWithIdentifier(
    entityName: string,
    identifierName: string,
  ): ExpressionNode {
    const expressionProps = new ExpressionBuilderDirector().buildIdentifierExpression(
      identifierName,
    );
    return new ExpressionBuilderDirector().buildEvaluationExpression(
      new EvaluationBuilderDirector().buildEntityEvaluationWithExpression(
        entityName,
        expressionProps,
      ),
    );
  }
}
