import { ExpressionBuilder } from '../builders/expressions/ExpressionBuilder.js';
import { LiteralBuilder } from '../builders/expressions/literal/LiteralBuilder.js';
import { StringLiteralBuilder } from '../builders/expressions/literal/StringLiteralBuilder.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';

export class ExpressionBuilderDirector {
  static buildStringLiteralExpression(value: string): ExpressionNode {
    const stringLit = new StringLiteralBuilder().withValue(value).build();

    const literalExpr = new LiteralBuilder().withLiteral(stringLit).build();
    return new ExpressionBuilder().withExpression(literalExpr).build();
  }
}
