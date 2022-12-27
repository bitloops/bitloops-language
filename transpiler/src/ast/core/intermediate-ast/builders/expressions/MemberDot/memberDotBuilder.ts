import { MemberDotExpressionNode } from '../../../nodes/Expression/MemberDot/MemberDotExpression.js';
import { IdentifierExpressionNode } from '../../../nodes/Expression/IdentifierExpression.js';
import { IBuilder } from '../../IBuilder.js';
import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';

export class MemberDotExpressionNodeBuilder implements IBuilder<MemberDotExpressionNode> {
  private memberDotExpressionNode: MemberDotExpressionNode;
  private leftExpression: ExpressionNode;
  private identifierExpressionNode?: IdentifierExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.memberDotExpressionNode = new MemberDotExpressionNode(metadata);
  }

  public withExpression(expr: ExpressionNode): MemberDotExpressionNodeBuilder {
    this.leftExpression = expr;
    return this;
  }

  public withIdentifier(identifier: IdentifierExpressionNode): MemberDotExpressionNodeBuilder {
    this.identifierExpressionNode = identifier;
    return this;
  }

  public build(): MemberDotExpressionNode {
    this.memberDotExpressionNode.addChild(this.leftExpression);
    this.memberDotExpressionNode.addChild(this.identifierExpressionNode);

    this.memberDotExpressionNode.buildObjectValue();

    return this.memberDotExpressionNode;
  }
}
