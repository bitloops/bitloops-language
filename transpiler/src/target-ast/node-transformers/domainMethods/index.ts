import { IdentifierExpressionBuilder } from '../../../ast/core/intermediate-ast/builders/expressions/IdentifierExpressionBuilder.js';
import { MemberDotExpressionNodeBuilder } from '../../../ast/core/intermediate-ast/builders/expressions/MemberDot/memberDotBuilder.js';
import { ThisExpressionNodeBuilder } from '../../../ast/core/intermediate-ast/builders/expressions/thisExpressionBuilder.js';
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

    for (const memberDotExpr of memberDotExpressions) {
      const expressionNode = memberDotExpr.getExpression();
      if (expressionNode.isThisExpression() && !memberDotExpr.hasMethodCallExpressionParent()) {
        const thisExpression = new ThisExpressionNodeBuilder().build();
        const propsIdentifier = new IdentifierExpressionBuilder().withValue('props').build();
        new MemberDotExpressionNodeBuilder()
          .withExpression(thisExpression)
          .withIdentifier(propsIdentifier)
          .build();
        // memberDotExpr.replaceChild(expressionNode, expressionWithThisDotProps);
      }
    }
  }
}

export class DomainCreateNodeTSTransformer extends BaseDomainMethodNodeTSTransformer<DomainCreateNode> {}
