import { ExpressionBuilder } from '../../../../../ast/core/intermediate-ast/builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../../../../../ast/core/intermediate-ast/builders/expressions/IdentifierExpressionBuilder.js';
import { MemberDotExpressionNodeBuilder } from '../../../../../ast/core/intermediate-ast/builders/expressions/MemberDot/memberDotBuilder.js';
import { ThisExpressionNodeBuilder } from '../../../../../ast/core/intermediate-ast/builders/expressions/thisExpressionBuilder.js';
import { ExpressionNode } from '../../../../../ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IdentifierExpressionNode } from '../../../../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';

export class PrependThisNodeTSTransformer {
  /**
   * 
   * For an expression like document.status1.status2
   * Based on the grammar:
      expression
      : expression Dot regularIdentifier                           # MemberDotExpression
      | regularIdentifier                                          # IdentifierExpression
      | This                                                        # ThisExpression
   * it's analyzed(recursively) into: 

      MemberDotExpression {
        left: MemberDotExpression {
          left: IdentifierExpression {
            value: 'document',
          },
          right: IdentifierExpression {
            value: 'status1',
          }
        },
        right: IdentifierExpression {
          value: 'status2',
        },
      }
      So in this, we would replace the IdentifierExpression { value: 'document' } with a 
      MemberDotExpression {
        left: ThisExpression {},
        right: IdentifierExpression {
          value: 'document',
        },
      }
      Resulting in: this.document.status1.status2
   */
  public replaceIdentifierExpressionNodeToThisMemberDotNode(
    identifierExpressionNode: IdentifierExpressionNode,
  ): ExpressionNode {
    // ExpressionNode that is MemberDotExpressionNode
    const thisNode = new ThisExpressionNodeBuilder().build();
    // We wrap all expression into an ExpressionBuilder
    const thisExpressionNode = new ExpressionBuilder().withExpression(thisNode).build();

    // If regularIdentifier is updated to use the new IdentifierExpressionBuilder,
    // Extract this from the parameter: identifierExpressionNode
    // e.g. 'document' in the above example
    const identifier = identifierExpressionNode.getIdentifierName();

    // this won't need to build a new IdentifierExpressionBuilder
    const identifierExpr = new IdentifierExpressionBuilder().withValue(identifier).build();
    const memberExpr = new MemberDotExpressionNodeBuilder(identifierExpressionNode.getMetadata())
      .withExpression(thisExpressionNode)
      .withIdentifier(identifierExpr)
      .build();
    return new ExpressionBuilder().withExpression(memberExpr).build();
  }
}
