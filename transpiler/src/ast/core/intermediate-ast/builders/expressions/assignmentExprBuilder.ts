import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { AssignmentExpressionNode } from '../../nodes/Expression/AssignmentExpression.js';
import { LeftExpressionBuilder } from './leftExpressionBuilder.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';

export class AssignmentExpressionNodeBuilder implements IBuilder<AssignmentExpressionNode> {
  private assignmentExpressionNode: AssignmentExpressionNode;
  private leftExpression: LeftExpressionNode;
  private rightExpression: ExpressionNode;

  constructor() {
    this.assignmentExpressionNode = new AssignmentExpressionNode();
  }

  public withLeftExpression(expr: ExpressionNode): AssignmentExpressionNodeBuilder {
    this.leftExpression = new LeftExpressionBuilder().withExpression(expr).build();
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
