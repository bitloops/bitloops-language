import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { StatementListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/StatementList.js';
import { ExpressionBuilderDirector } from '../expression.js';
import { StatementBuilderDirector } from './statementDirector.js';

export class StatementListBuilderDirector {
  private builder: StatementListNodeBuilder;

  constructor() {
    this.builder = new StatementListNodeBuilder();
  }

  buildReturnOkStatementEntityEvaluation(
    entityName: string,
    entityPropsIdentifier: string,
  ): StatementListNode {
    return this.builder
      .withStatements([
        new StatementBuilderDirector().buildReturnOKStatement(
          new StatementBuilderDirector().buildExpressionEntityEvaluationWithIdentifier(
            entityName,
            entityPropsIdentifier,
          ),
        ),
      ])
      .build();
  }

  /**
   * e.g. this.name = name
   */
  buildThisAssignmentExpression(identifierName: string): StatementListNode {
    const leftExpression = new ExpressionBuilderDirector().buildThisExpression();
    const memberDotExpression = new ExpressionBuilderDirector().buildMemberDotExpression(
      leftExpression,
      identifierName,
    );
    const identifierExpression = new ExpressionBuilderDirector().buildIdentifierExpression(
      identifierName,
    );
    return this.builder
      .withStatements([
        new ExpressionBuilderDirector().buildAssignmentExpression(
          memberDotExpression,
          identifierExpression,
        ),
      ])
      .build();
  }

  /**
   * e.g. this.props.name = name
   */
  buildThisPropsAssignmentExpression(identifierName: string): StatementListNode {
    const leftExpression = new ExpressionBuilderDirector().buildThisExpression();
    const memberDotPropsExpression = new ExpressionBuilderDirector().buildMemberDotExpression(
      leftExpression,
      'props',
    );
    const memberDotExpression = new ExpressionBuilderDirector().buildMemberDotExpression(
      memberDotPropsExpression,
      identifierName,
    );
    const identifierExpression = new ExpressionBuilderDirector().buildIdentifierExpression(
      identifierName,
    );
    return this.builder
      .withStatements([
        new ExpressionBuilderDirector().buildAssignmentExpression(
          memberDotExpression,
          identifierExpression,
        ),
      ])
      .build();
  }
}
