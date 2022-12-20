import { ReturnErrorStatementNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ReturnErrorStatementNodeBuilder.js';
import { ReturnOKStatementNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ReturnOkStatamentNodeBuilder.js';
import { ReturnStatementNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ReturnStatementBuilder.js';
import { ArgumentNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ReturnErrorStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ReturnErrorStatementNode.js';
import { ReturnOKStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ReturnOKStatementNode.js';
import { ReturnStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ReturnStatementNode.js';
import { ArgumentListDirector } from '../argumentList.js';
import { ExpressionBuilderDirector } from '../expression.js';

export class ReturnStatementBuilderDirector {
  buildReturn(expr: ExpressionNode): ReturnStatementNode {
    return new ReturnStatementNodeBuilder().withExpression(expr).build();
  }

  buildReturnOK(expr: ExpressionNode): ReturnOKStatementNode {
    return new ReturnOKStatementNodeBuilder().withExpression(expr).build();
  }
  buildEmptyReturnOK(): ReturnOKStatementNode {
    return new ReturnOKStatementNodeBuilder().build();
  }

  buildReturnError(expr: ExpressionNode): ReturnErrorStatementNode {
    return new ReturnErrorStatementNodeBuilder().withExpression(expr).build();
  }

  buildThisMethodReturn(methodName: string, args: ArgumentNode[]): ReturnStatementNode {
    const methodExpr = new ExpressionBuilderDirector().buildMemberDotExpression(
      new ExpressionBuilderDirector().buildThisExpression(),
      methodName,
    );
    const method = new ExpressionBuilderDirector().buildMethodCallExpression(
      methodExpr,
      new ArgumentListDirector().buildArgumentListWithArgs(args),
    );
    return new ReturnStatementNodeBuilder().withExpression(method).build();
  }
}
