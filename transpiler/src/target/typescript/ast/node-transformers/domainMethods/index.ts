import { ExpressionBuilder } from '../../../../../ast/core/intermediate-ast/builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../../../../../ast/core/intermediate-ast/builders/expressions/IdentifierExpressionBuilder.js';
import { MemberDotExpressionNodeBuilder } from '../../../../../ast/core/intermediate-ast/builders/expressions/MemberDot/memberDotBuilder.js';
import { ThisExpressionNodeBuilder } from '../../../../../ast/core/intermediate-ast/builders/expressions/thisExpressionBuilder.js';
import { DomainCreateNode } from '../../../../../ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { PrivateMethodDeclarationNode } from '../../../../../ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationNode.js';
import { PublicMethodDeclarationNode } from '../../../../../ast/core/intermediate-ast/nodes/methods/PublicMethodDeclarationNode.js';
import { AppendDotValueNodeTSTransformer } from '../generic/appendDotValue.js';
import { NodeModelToTargetASTTransformer } from '../index.js';

class BaseDomainMethodNodeTSTransformer<
  T extends DomainCreateNode | PublicMethodDeclarationNode | PrivateMethodDeclarationNode,
> extends NodeModelToTargetASTTransformer<T> {
  run(): void {
    this.addPropsToMemberThisExpression();
    this.transformDotValueOfDomainEvaluations();
  }

  private addPropsToMemberThisExpression(): void {
    const memberDotExpressions = this.tree.getMemberDotExpressions(this.node);
    if (memberDotExpressions.length === 0) {
      return;
    }

    for (const memberDotExpr of memberDotExpressions) {
      const expressionValuesNode = memberDotExpr.getExpressionValues();
      if (
        expressionValuesNode.isThisExpression() &&
        !memberDotExpr.hasMethodCallExpressionParent()
      ) {
        const thisExpression = new ExpressionBuilder()
          .withExpression(new ThisExpressionNodeBuilder().build())
          .build();
        const propsIdentifier = new IdentifierExpressionBuilder().withValue('props').build();
        const expressionWithThisDotProps = new ExpressionBuilder()
          .withExpression(
            new MemberDotExpressionNodeBuilder()
              .withExpression(thisExpression)
              .withIdentifier(propsIdentifier)
              .build(),
          )
          .build();
        const expressionNode = memberDotExpr.getExpression();
        memberDotExpr.replaceChild(expressionNode, expressionWithThisDotProps);
      }
    }
  }

  private transformDotValueOfDomainEvaluations(): void {
    const appendDotValueTransformer = new AppendDotValueNodeTSTransformer(this.node, this.tree);
    appendDotValueTransformer.transformDotValueOfDomainEvaluations();
  }
}

export class DomainCreateMethodNodeTSTransformer extends BaseDomainMethodNodeTSTransformer<DomainCreateNode> {}
export class DomainPublicMethodNodeTSTransformer extends BaseDomainMethodNodeTSTransformer<PublicMethodDeclarationNode> {}
export class DomainPrivateMethodNodeTSTransformer extends BaseDomainMethodNodeTSTransformer<PrivateMethodDeclarationNode> {}
