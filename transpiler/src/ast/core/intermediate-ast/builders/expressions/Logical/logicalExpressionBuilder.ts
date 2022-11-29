import { LogicalXorExpressionNode } from '../../../nodes/Expression/Logical/logicalXorExpressionNode.js';
import { LogicalOrExpressionNode } from '../../../nodes/Expression/Logical/logicalOrExpression.js';
import { LogicalAndExpressionNode } from '../../../nodes/Expression/Logical/LogicalAndExpression.js';
import { LogicalExpressionNode } from '../../../nodes/Expression/Logical/LogicalExpressionNode.js';
import { IBuilder } from '../../IBuilder.js';
import { NotExpressionNode } from '../../../nodes/Expression/NotExpression.js';

export class LogicalExpressionBuilder implements IBuilder<LogicalExpressionNode> {
  private logicalExpressionNode: LogicalExpressionNode;
  private notExpression: NotExpressionNode;
  private andExpression?: LogicalAndExpressionNode;
  private orExpression?: LogicalOrExpressionNode;
  private xorExpression?: LogicalXorExpressionNode;

  constructor() {
    this.logicalExpressionNode = new LogicalExpressionNode();
  }

  withNOTExpression(notExpression: NotExpressionNode): LogicalExpressionBuilder {
    this.notExpression = notExpression;
    return this;
  }

  public withANDExpression(andExpression: LogicalAndExpressionNode): LogicalExpressionBuilder {
    this.andExpression = andExpression;
    return this;
  }
  public withORExpression(orExpression: LogicalOrExpressionNode): LogicalExpressionBuilder {
    this.orExpression = orExpression;
    return this;
  }
  public withXORExpression(xorExpression: LogicalXorExpressionNode): LogicalExpressionBuilder {
    this.xorExpression = xorExpression;
    return this;
  }

  public build(): LogicalExpressionNode {
    if (this.notExpression) {
      this.logicalExpressionNode.addChild(this.notExpression);
    }
    if (this.andExpression) {
      this.logicalExpressionNode.addChild(this.andExpression);
    }
    if (this.orExpression) {
      this.logicalExpressionNode.addChild(this.orExpression);
    }
    if (this.xorExpression) {
      this.logicalExpressionNode.addChild(this.xorExpression);
    }
    this.logicalExpressionNode.buildObjectValue();

    return this.logicalExpressionNode;
  }
}
