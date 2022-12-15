import { DomainCreateNode } from '../../../ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { IntermediateASTNode } from '../../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { NodeModelToTargetASTTransformer } from '../index.js';

class BaseDomainMethodNodeTSTransformer<
  T extends IntermediateASTNode,
> extends NodeModelToTargetASTTransformer<T> {
  run(): void {
    this.addPropsToMemberThisExpression();
    this.tree.buildValueRecursiveBottomUp(this.node);
  }

  private addPropsToMemberThisExpression(): void {
    const memberDotExpressions = this.tree.getMemberDotExpressions(this.node);
    if (memberDotExpressions.length === 0) {
      return;
    }

    // if (executeStatement.isExpressionNode()) {
    //   return this.handleAwaitOfPlainMethodCall(executeStatement);
    // }

    // const expression = executeStatement.getExpression();
    // if (!expression.isMethodCallExpression()) {
    //   throw new Error('Method call expression not found');
    // }
    // this.prependAwaitToMethodCallNode(expression);
  }
}

export class DomainCreateNodeTSTransformer extends BaseDomainMethodNodeTSTransformer<DomainCreateNode> {}
