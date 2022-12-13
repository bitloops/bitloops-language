import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ReturnOKStatementNode } from '../../nodes/statements/ReturnOKStatementNode.js';
import { IBuilder } from '../IBuilder.js';

export class ReturnOKStatementNodeBuilder implements IBuilder<ReturnOKStatementNode> {
  private returnOKStatementNode: ReturnOKStatementNode;
  private expressionNode: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.returnOKStatementNode = new ReturnOKStatementNode(metadata);
  }

  public withExpression(expressionNode: ExpressionNode): ReturnOKStatementNodeBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public build(): ReturnOKStatementNode {
    this.returnOKStatementNode.addChild(this.expressionNode);

    this.returnOKStatementNode.buildObjectValue();

    return this.returnOKStatementNode;
  }
}
