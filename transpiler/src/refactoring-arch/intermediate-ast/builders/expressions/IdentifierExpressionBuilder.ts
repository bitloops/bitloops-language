import { IdentifierExpressionNode } from '../../nodes/Expression/IdentifierExpression.js';
import { IBuilder } from '../IBuilder.js';

export class IdentifierExpressionBuilder implements IBuilder<IdentifierExpressionNode> {
  //   public readonly NAME = 'booleanLiteral';

  private identifierValue: string;
  private identifierExpressionNode: IdentifierExpressionNode;

  constructor() {
    this.identifierExpressionNode = new IdentifierExpressionNode();
  }

  public withValue(identifierValue: string): IdentifierExpressionBuilder {
    this.identifierValue = identifierValue;
    return this;
  }

  public build(): IdentifierExpressionNode {
    this.identifierExpressionNode.setValue(this.identifierValue);

    return this.identifierExpressionNode;
  }
}
