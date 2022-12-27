import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { GetClassNode } from '../../nodes/Expression/GetClass.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';

export class GetClassNodeBuilder implements IBuilder<GetClassNode> {
  private getClassNode: GetClassNode;
  private expression: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.getClassNode = new GetClassNode(metadata);
  }

  public withExpression(expr: ExpressionNode): GetClassNodeBuilder {
    this.expression = expr;
    return this;
  }

  public build(): GetClassNode {
    this.getClassNode.addChild(this.expression);
    this.getClassNode.buildObjectValue();

    return this.getClassNode;
  }
}
