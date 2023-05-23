import { ReturnErrorStatementNodeBuilder } from '../builders/statements/ReturnErrorStatementNodeBuilder.js';
import { ReturnOKStatementNodeBuilder } from '../builders/statements/ReturnOkStatamentNodeBuilder.js';
import { ReturnStatementNodeBuilder } from '../builders/statements/ReturnStatementBuilder.js';
import { ArgumentNode } from '../nodes/ArgumentList/ArgumentNode.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { ReturnErrorStatementNode } from '../nodes/statements/ReturnErrorStatementNode.js';
import { ReturnOKStatementNode } from '../nodes/statements/ReturnOKStatementNode.js';
import { ReturnStatementNode } from '../nodes/statements/ReturnStatementNode.js';
import { ArgumentListDirector } from './argumentList.js';
import { ExpressionBuilderDirector } from './expressionNodeBuilderDirector.js';

export class ReturnStatementBuilderDirector {
  private metadata: TNodeMetadata;

  constructor(metadata?: TNodeMetadata) {
    this.metadata = metadata;
  }

  buildReturn(expr: ExpressionNode): ReturnStatementNode {
    return new ReturnStatementNodeBuilder(this.metadata).withExpression(expr).build();
  }

  buildEmptyReturn(): ReturnStatementNode {
    return new ReturnStatementNodeBuilder(this.metadata).build();
  }

  buildReturnOKEmpty(): ReturnOKStatementNode {
    return new ReturnOKStatementNodeBuilder(this.metadata).build();
  }

  buildReturnOK(expr: ExpressionNode): ReturnOKStatementNode {
    return new ReturnOKStatementNodeBuilder(this.metadata).withExpression(expr).build();
  }
  buildEmptyReturnOK(): ReturnOKStatementNode {
    return new ReturnOKStatementNodeBuilder(this.metadata).build();
  }

  buildReturnError(expr: ExpressionNode): ReturnErrorStatementNode {
    return new ReturnErrorStatementNodeBuilder(this.metadata).withExpression(expr).build();
  }

  buildThisMethodReturn(methodName: string, args: ArgumentNode[]): ReturnStatementNode {
    const methodExpr = new ExpressionBuilderDirector(this.metadata).buildMemberDotExpression(
      new ExpressionBuilderDirector().buildThisExpression(),
      methodName,
    );
    const method = new ExpressionBuilderDirector(this.metadata).buildMethodCallExpression(
      methodExpr,
      new ArgumentListDirector().buildArgumentListWithArgs(args),
    );
    return new ReturnStatementNodeBuilder(this.metadata).withExpression(method).build();
  }
}
