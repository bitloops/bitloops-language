import { IdentifierExpressionNode } from '../../nodes/Expression/IdentifierExpression.js';
import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IfErrorExpressionNode } from '../../nodes/Expression/IfErrorExpressionNode.js';

export class IfErrorExpressionNodeBuilder implements IBuilder<IfErrorExpressionNode> {
  private ifErrorExpressionNode: IfErrorExpressionNode;
  private leftExpression: ExpressionNode;
  private anonymousFunctionNode?: IdentifierExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.ifErrorExpressionNode = new IfErrorExpressionNode(metadata);
  }

  public withExpression(expr: ExpressionNode): IfErrorExpressionNodeBuilder {
    this.leftExpression = expr;
    return this;
  }

  public withAnonymousFunction(
    anonymousFunction: AnonymousFunctionNode,
  ): IfErrorExpressionNodeBuilder {
    this.anonymousFunctionNode = anonymousFunction;
    return this;
  }

  public build(): IfErrorExpressionNode {
    this.ifErrorExpressionNode.addChild(this.leftExpression);

    if (this.anonymousFunctionNode) {
      this.ifErrorExpressionNode.addChild(this.anonymousFunctionNode);
    }
    this.ifErrorExpressionNode.buildObjectValue();

    return this.ifErrorExpressionNode;
  }
}
