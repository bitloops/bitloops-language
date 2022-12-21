import { IdentifierExpressionNode } from '../../nodes/Expression/IdentifierExpression.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class IdentifierExpressionBuilder implements IBuilder<IdentifierExpressionNode> {
  private identifierValue: string;
  private identifierExpressionNode: IdentifierExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.identifierExpressionNode = new IdentifierExpressionNode(metadata);
  }

  public withValue(identifierValue: string): IdentifierExpressionBuilder {
    this.identifierValue = identifierValue;
    return this;
  }

  public build(): IdentifierExpressionNode {
    this.identifierExpressionNode.buildLeafValue(this.identifierValue);

    return this.identifierExpressionNode;
  }
}
