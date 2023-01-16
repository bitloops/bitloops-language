import { ArgumentNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { ArgumentNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';
import { ExpressionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';

export class ArgumentDirector {
  buildArgument(expr: ExpressionNode): ArgumentNode {
    const argument = new ArgumentNodeBuilder().withExpression(expr).build();
    return argument;
  }
}
