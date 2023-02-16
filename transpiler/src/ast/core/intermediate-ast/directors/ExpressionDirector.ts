import { ArgumentListNodeBuilder } from '../builders/ArgumentList/ArgumentListNodeBuilder.js';
import { ArgumentNodeBuilder } from '../builders/ArgumentList/ArgumentNodeBuilder.js';
import { ExpressionBuilder } from '../builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../builders/expressions/IdentifierExpressionBuilder.js';
import { LiteralBuilder } from '../builders/expressions/literal/LiteralBuilder.js';
import { StringLiteralBuilder } from '../builders/expressions/literal/StringLiteralBuilder.js';
import { MemberDotExpressionNodeBuilder } from '../builders/expressions/MemberDot/memberDotBuilder.js';
import { MethodCallExpressionNodeBuilder } from '../builders/expressions/methodCallExprBuilder.js';
import { ThisExpressionNodeBuilder } from '../builders/expressions/thisExpressionBuilder.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';

export class ExpressionBuilderDirector {
  static buildStringLiteralExpression(value: string): ExpressionNode {
    const stringLit = new StringLiteralBuilder().withValue(value).build();

    const literalExpr = new LiteralBuilder().withLiteral(stringLit).build();
    return new ExpressionBuilder().withExpression(literalExpr).build();
  }

  static buildThisMethodCallWithMemberDotExpression({
    argumentIdentifierName,
    methodCallName,
    memberDotName,
  }: {
    argumentIdentifierName: string;
    methodCallName: string;
    memberDotName: string;
  }): ExpressionNode {
    const thisExprNode = new ExpressionBuilder()
      .withExpression(new ThisExpressionNodeBuilder().build())
      .build();
    const thisEventBusExpr = new ExpressionBuilder()
      .withExpression(
        new MemberDotExpressionNodeBuilder()
          .withExpression(thisExprNode)
          .withIdentifier(new IdentifierExpressionBuilder().withValue(memberDotName).build())
          .build(),
      )
      .build();
    const thisEventBusPublishManyExpr = new ExpressionBuilder()
      .withExpression(
        new MemberDotExpressionNodeBuilder()
          .withExpression(thisEventBusExpr)
          .withIdentifier(new IdentifierExpressionBuilder().withValue(methodCallName).build())
          .build(),
      )
      .build();

    const argumentIdentifierExpression = new ExpressionBuilder()
      .withExpression(new IdentifierExpressionBuilder().withValue(argumentIdentifierName).build())
      .build();
    const argumentNode = new ArgumentNodeBuilder()
      .withExpression(argumentIdentifierExpression)
      .build();
    const argumentListNode = new ArgumentListNodeBuilder().withArguments([argumentNode]).build();

    const methodCallExprNode = new ExpressionBuilder()
      .withExpression(
        new MethodCallExpressionNodeBuilder()
          .withExpression(thisEventBusPublishManyExpr)
          .withArgumentsList(argumentListNode)
          .build(),
      )
      .build();
    return methodCallExprNode;
  }
}
