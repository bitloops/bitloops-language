import { ErrorMessageNode } from '../../nodes/Error/message.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

// THis type will change to something like = { evaluationField: { name: string } & TExpression }
// export type TEvaluationField = ({ name: string } & TExpression)[];

export class ErrorMessageNodeBuilder implements IBuilder<ErrorMessageNode> {
  private messageNode: ErrorMessageNode;
  private expression: ExpressionNode;
  constructor() {
    this.messageNode = new ErrorMessageNode();
  }
  withExpression(expression: ExpressionNode): ErrorMessageNodeBuilder {
    this.expression = expression;
    return this;
  }
  build(): ErrorMessageNode {
    this.messageNode.addChild(this.expression);
    this.messageNode.buildObjectValue();
    return this.messageNode;
  }
}
