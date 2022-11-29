import { ArrayLiteralExpressionNodeBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/arrayLiteralExpressionBuilder.js';
import { ExpressionBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/IdentifierExpressionBuilder.js';
import { LiteralTypeBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/literal/components/LiteralTypeBuilder.js';
import { LiteralValueBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/literal/components/LiteralValueBuilder.js';
import { LiteralBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/literal/LiteralBuilder.js';
import { IntegerLiteralBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/literal/NumericLiteral/IntegerLiteralBuilder.js';
import { NumericLiteralBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/literal/NumericLiteral/NumericLiteralBuilder.js';
import { LogicalExpressionBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/Logical/logicalExpressionBuilder.js';
import { LogicalOrExpressionBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/Logical/logicalOrExpressionBuilder.js';
import { LogicalXorExpressionBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/Logical/logicalXorExpressionBuilder.js';
import { NotExpressionNodeBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/Logical/notExpression.js';
import { ExpressionNode } from '../../../../../src/refactoring-arch/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IdentifierExpressionNode } from '../../../../../src/refactoring-arch/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { LogicalAndExpressionBuilder } from './../../../../../src/refactoring-arch/intermediate-ast/builders/expressions/Logical/logicalAndExpressionBuilder.js';

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
    const andNode = new LogicalAndExpressionBuilder()
      .withLeftExpression(expr1)
      .withRightExpression(expr2)
      .build();
    const logicalNode = new LogicalExpressionBuilder().withANDExpression(andNode).build();
    return new ExpressionBuilder().withExpression(logicalNode).build();
  }

  buildORExpression(expr1: ExpressionNode, expr2: ExpressionNode): ExpressionNode {
    const orNode = new LogicalOrExpressionBuilder()
      .withLeftExpression(expr1)
      .withRightExpression(expr2)
      .build();
    const logicalNode = new LogicalExpressionBuilder().withORExpression(orNode).build();
    return new ExpressionBuilder().withExpression(logicalNode).build();
  }

  buildXORExpression(expr1: ExpressionNode, expr2: ExpressionNode): ExpressionNode {
    const xorNode = new LogicalXorExpressionBuilder()
      .withLeftExpression(expr1)
      .withRightExpression(expr2)
      .build();
    const logicalNode = new LogicalExpressionBuilder().withXORExpression(xorNode).build();
    return new ExpressionBuilder().withExpression(logicalNode).build();
  }

  buildArrayLiteralExpression(...expressions: ExpressionNode[]): ExpressionNode {
    const arrayNode = new ArrayLiteralExpressionNodeBuilder()
      .withArrayElements(expressions)
      .build();
    return new ExpressionBuilder().withExpression(arrayNode).build();
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

  buildIdentifier(name: string): IdentifierExpressionNode {
    const identifierNode = new IdentifierExpressionBuilder().withValue(name).build();
    return identifierNode;
  }
}
