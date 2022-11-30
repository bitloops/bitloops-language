import { RelationalExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/relationalBuilder.js';
import { ArrayLiteralExpressionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/arrayLiteralExpressionBuilder.js';
import { ExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/IdentifierExpressionBuilder.js';
import { LiteralTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/components/LiteralTypeBuilder.js';
import { LiteralValueBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/components/LiteralValueBuilder.js';
import { LiteralBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/LiteralBuilder.js';
import { IntegerLiteralBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/NumericLiteral/IntegerLiteralBuilder.js';
import { NumericLiteralBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/NumericLiteral/NumericLiteralBuilder.js';
import { LogicalExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/Logical/logicalExpressionBuilder.js';
import { LogicalOrExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/Logical/logicalOrExpressionBuilder.js';
import { LogicalXorExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/Logical/logicalXorExpressionBuilder.js';
import { NotExpressionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/Logical/notExpression.js';
import { ExpressionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IdentifierExpressionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { LogicalAndExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/Logical/logicalAndExpressionBuilder.js';
import { OperatorBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/operatorBuilder.js';
import { LeftExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/leftExpressionBuilder.js';
import { RightExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/rightExpressionBuilder.js';
import {
  TAdditiveOperator,
  TEqualityOperator,
  TRelationalOperator,
} from '../../../../../src/types.js';
import { DecimalLiteralBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/NumericLiteral/DecimalLiteralBuilder.js';
import { EqualityExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/equalityBuilderExpression.js';
import { BooleanLiteralBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/BooleanLiteralBuilder.js';
import { AdditiveExpressionBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/additiveExpresssion.js';
import { StringLiteralBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/StringLiteralBuilder.js';
import { AssignmentExpressionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/assignmentExprBuilder.js';
import { ThisExpressionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/thisExpressionBuilder.js';
import { ParenthesizedExpressionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/parenthesizedExprBuilder.js';
import { MemberDotExpressionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/MemberDot/memberDotBuilder.js';
import { ToStringBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/ToStringBuilder.js';
import { GetClassNodeBuilder } from './../../../../../src/ast/core/intermediate-ast/builders/expressions/GetClassBuilder.js';

export class ExpressionBuilderDirector {
  buildIdentifierExpression(name: string): ExpressionNode {
    const expressionNode = new ExpressionBuilder()
      .withExpression(this.buildIdentifier(name))
      .build();
    return expressionNode;
  }

  buildNotExpression(expr: ExpressionNode): ExpressionNode {
    const notNode = new NotExpressionNodeBuilder().withExpression(expr).build();
    const logicalNode = new LogicalExpressionBuilder().withNOTExpression(notNode).build();
    return new ExpressionBuilder().withExpression(logicalNode).build();
  }

  buildANDExpression(expr1: ExpressionNode, expr2: ExpressionNode): ExpressionNode {
    const left = new LeftExpressionBuilder().withExpression(expr1).build();
    const right = new RightExpressionBuilder().withExpression(expr2).build();
    const andNode = new LogicalAndExpressionBuilder()
      .withLeftExpression(left)
      .withRightExpression(right)
      .build();
    const logicalNode = new LogicalExpressionBuilder().withANDExpression(andNode).build();
    return new ExpressionBuilder().withExpression(logicalNode).build();
  }

  buildORExpression(expr1: ExpressionNode, expr2: ExpressionNode): ExpressionNode {
    const left = new LeftExpressionBuilder().withExpression(expr1).build();
    const right = new RightExpressionBuilder().withExpression(expr2).build();
    const orNode = new LogicalOrExpressionBuilder()
      .withLeftExpression(left)
      .withRightExpression(right)
      .build();
    const logicalNode = new LogicalExpressionBuilder().withORExpression(orNode).build();
    return new ExpressionBuilder().withExpression(logicalNode).build();
  }

  buildXORExpression(expr1: ExpressionNode, expr2: ExpressionNode): ExpressionNode {
    const left = new LeftExpressionBuilder().withExpression(expr1).build();
    const right = new RightExpressionBuilder().withExpression(expr2).build();
    const xorNode = new LogicalXorExpressionBuilder()
      .withLeftExpression(left)
      .withRightExpression(right)
      .build();
    const logicalNode = new LogicalExpressionBuilder().withXORExpression(xorNode).build();
    return new ExpressionBuilder().withExpression(logicalNode).build();
  }

  buildRelationalExpression(
    expr1: ExpressionNode,
    expr2: ExpressionNode,
    op: TRelationalOperator,
  ): ExpressionNode {
    const left = new LeftExpressionBuilder().withExpression(expr1).build();
    const right = new RightExpressionBuilder().withExpression(expr2).build();

    const operator = new OperatorBuilder().withSymbol(op).build();

    const node = new RelationalExpressionBuilder()
      .withLeftExpression(left)
      .withOperator(operator)
      .withRightExpression(right)
      .build();

    const expressionNode = new ExpressionBuilder().withExpression(node).build();

    return expressionNode;
  }

  buildArrayLiteralExpression(...expressions: ExpressionNode[]): ExpressionNode {
    const arrayNode = new ArrayLiteralExpressionNodeBuilder()
      .withArrayElements(expressions)
      .build();
    return new ExpressionBuilder().withExpression(arrayNode).build();
  }

  buildAssignmentExpression(left: ExpressionNode, right: ExpressionNode): ExpressionNode {
    const assignmentNode = new AssignmentExpressionNodeBuilder()
      .withLeftExpression(left)
      .withRightExpression(right)
      .build();
    return new ExpressionBuilder().withExpression(assignmentNode).build();
  }

  buildMemberDotExpression(
    leftExpression: ExpressionNode,
    identifierValue: string,
  ): ExpressionNode {
    const identifierExpr = new IdentifierExpressionBuilder().withValue(identifierValue).build();
    const memberExpr = new MemberDotExpressionNodeBuilder()
      .withExpression(leftExpression)
      .withIdentifier(identifierExpr)
      .build();
    return new ExpressionBuilder().withExpression(memberExpr).build();
  }

  buildToStringExpression(expression: ExpressionNode): ExpressionNode {
    const node = new ToStringBuilder().withExpression(expression).build();
    return new ExpressionBuilder().withExpression(node).build();
  }

  buildGetClassExpression(expression: ExpressionNode): ExpressionNode {
    const node = new GetClassNodeBuilder().withExpression(expression).build();
    return new ExpressionBuilder().withExpression(node).build();
  }

  buildEqualityExpression(
    expr1: ExpressionNode,
    expr2: ExpressionNode,
    op: TEqualityOperator = '==',
  ): ExpressionNode {
    const left = new LeftExpressionBuilder().withExpression(expr1).build();
    const right = new RightExpressionBuilder().withExpression(expr2).build();

    const operator = new OperatorBuilder().withSymbol(op).build();

    const node = new EqualityExpressionBuilder()
      .withLeftExpression(left)
      .withOperator(operator)
      .withRightExpression(right)
      .build();

    const expressionNode = new ExpressionBuilder().withExpression(node).build();

    return expressionNode;
  }

  buildAdditiveExpression(
    expr1: ExpressionNode,
    expr2: ExpressionNode,
    op: TAdditiveOperator = '+',
  ): ExpressionNode {
    const left = new LeftExpressionBuilder().withExpression(expr1).build();
    const right = new RightExpressionBuilder().withExpression(expr2).build();

    const operator = new OperatorBuilder().withSymbol(op).build();

    const node = new AdditiveExpressionBuilder()
      .withLeftExpression(left)
      .withRightExpression(right)
      .withOperator(operator)
      .build();
    const expressionNode = new ExpressionBuilder().withExpression(node).build();

    return expressionNode;
  }

  buildInt32LiteralExpression(value: number): ExpressionNode {
    const valueNode = new LiteralValueBuilder().withValue(value.toString()).build();
    const typeNode = new LiteralTypeBuilder().withType('int32').build();
    const integerLiteralNode = new IntegerLiteralBuilder()
      .withValue(valueNode)
      .withType(typeNode)
      .build();
    const numericLiteral = new NumericLiteralBuilder()
      .withNumericLiteral(integerLiteralNode)
      .build();

    const literalExpr = new LiteralBuilder().withLiteral(numericLiteral).build();
    return new ExpressionBuilder().withExpression(literalExpr).build();
  }

  buildFloatLiteralExpression(value: number): ExpressionNode {
    const valueNode = new LiteralValueBuilder().withValue(value.toString()).build();
    const typeNode = new LiteralTypeBuilder().withType('float').build();
    const decimalLiteralNode = new DecimalLiteralBuilder()
      .withValue(valueNode)
      .withType(typeNode)
      .build();
    const numericLiteral = new NumericLiteralBuilder()
      .withNumericLiteral(decimalLiteralNode)
      .build();

    const literalExpr = new LiteralBuilder().withLiteral(numericLiteral).build();
    return new ExpressionBuilder().withExpression(literalExpr).build();
  }

  buildBooleanLiteralExpression(value: boolean): ExpressionNode {
    const booleanLit = new BooleanLiteralBuilder().withValue(`${value}`).build();

    const literalExpr = new LiteralBuilder().withLiteral(booleanLit).build();
    return new ExpressionBuilder().withExpression(literalExpr).build();
  }

  buildStringLiteralExpression(value: string): ExpressionNode {
    const stringLit = new StringLiteralBuilder().withValue(value).build();

    const literalExpr = new LiteralBuilder().withLiteral(stringLit).build();
    return new ExpressionBuilder().withExpression(literalExpr).build();
  }

  buildIdentifier(name: string): IdentifierExpressionNode {
    const identifierNode = new IdentifierExpressionBuilder().withValue(name).build();
    return identifierNode;
  }

  buildThisExpression(): ExpressionNode {
    const thisExpressionNode = new ThisExpressionNodeBuilder().build();
    const expressionNode = new ExpressionBuilder().withExpression(thisExpressionNode).build();
    return expressionNode;
  }

  buildParenthesizedExpression(expression: ExpressionNode): ExpressionNode {
    const parenthesizedExpressionNode = new ParenthesizedExpressionNodeBuilder()
      .withExpression(expression)
      .build();
    const expressionNode = new ExpressionBuilder()
      .withExpression(parenthesizedExpressionNode)
      .build();
    return expressionNode;
  }
}
