import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { StatementListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/StatementList.js';
import { ArgumentListDirector } from '../argumentList.js';
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
   * e.g. this.testMethod(this.name)
   */
  buildThisMethodCallExpressionWithThisArgument({
    identifierMethodName,
    identifierArgumentName,
  }: {
    identifierMethodName: string;
    identifierArgumentName: string;
  }): StatementListNode {
    const memberDotExpression = new ExpressionBuilderDirector().buildThisMemberDotExpression(
      identifierMethodName,
    );
    const argumentList = new ArgumentListDirector().buildArgumentListWithThisMemberDotExpression(
      identifierArgumentName,
    );
    const methodCallExpression = new ExpressionBuilderDirector().buildMethodCallExpression(
      memberDotExpression,
      argumentList,
    );

    return this.builder.withStatements([methodCallExpression]).build();
  }

  /**
   * e.g. this.testMethod(this.props.name)
   */
  buildThisMethodCallExpressionWithThisPropsArgument({
    identifierMethodName,
    identifierArgumentName,
  }: {
    identifierMethodName: string;
    identifierArgumentName: string;
  }): StatementListNode {
    const memberDotExpression = new ExpressionBuilderDirector().buildThisMemberDotExpression(
      identifierMethodName,
    );
    const argumentList =
      new ArgumentListDirector().buildArgumentListWithThisPropsMemberDotExpression(
        identifierArgumentName,
      );
    const methodCallExpression = new ExpressionBuilderDirector().buildMethodCallExpression(
      memberDotExpression,
      argumentList,
    );

    return this.builder.withStatements([methodCallExpression]).build();
  }

  /**
   * e.g. this.name = name
   */
  buildThisAssignmentExpression(identifierName: string): StatementListNode {
    const memberDotExpression = new ExpressionBuilderDirector().buildThisMemberDotExpression(
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
    const memberDotPropsExpression = new ExpressionBuilderDirector().buildThisMemberDotExpression(
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
  /**
   * e.g. x == y
   */
  buildLogicalEqualityExpression(
    leftExp: ExpressionNode,
    rightExp: ExpressionNode,
  ): StatementListNode {
    return this.builder
      .withStatements([new ExpressionBuilderDirector().buildEqualityExpression(rightExp, leftExp)])
      .build();
  }
}
