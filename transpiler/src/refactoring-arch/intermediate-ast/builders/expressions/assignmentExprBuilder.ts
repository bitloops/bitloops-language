import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { AssignmentExpressionNode } from '../../nodes/Expression/AssignmentExpression.js';

export class AssignmentExpressionNodeBuilder implements IBuilder<AssignmentExpressionNode> {
  private assignmentExpressionNode: AssignmentExpressionNode;
  private leftExpression: ExpressionNode;
  private rightExpression: ExpressionNode;

  constructor() {
    this.assignmentExpressionNode = new AssignmentExpressionNode();
  }

  public withLeftExpression(expr: ExpressionNode): AssignmentExpressionNodeBuilder {
    this.leftExpression = expr;
    return this;
  }

  public withRightExpression(expr: ExpressionNode): AssignmentExpressionNodeBuilder {
    this.rightExpression = expr;
    return this;
  }

  public build(): AssignmentExpressionNode {
    this.assignmentExpressionNode.addChild(this.leftExpression);
    this.assignmentExpressionNode.addChild(this.rightExpression);

    this.assignmentExpressionNode.buildObjectValue();

    return this.assignmentExpressionNode;
  }
}
