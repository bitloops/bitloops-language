import { ErrorIdNode } from '../../nodes/Error/errorId.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

// THis type will change to something like = { evaluationField: { name: string } & TExpression }
// export type TEvaluationField = ({ name: string } & TExpression)[];

export class ErrorIdNodeBuilder implements IBuilder<ErrorIdNode> {
  private IdNode: ErrorIdNode;
  private expression: ExpressionNode;
  constructor() {
    this.IdNode = new ErrorIdNode();
  }
  withExpression(expression: ExpressionNode): ErrorIdNodeBuilder {
    this.expression = expression;
    return this;
  }
  build(): ErrorIdNode {
    this.IdNode.addChild(this.expression);
    this.IdNode.buildObjectValue();
    return this.IdNode;
  }
}
