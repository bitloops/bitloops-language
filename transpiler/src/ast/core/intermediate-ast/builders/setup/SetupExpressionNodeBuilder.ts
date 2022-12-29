import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { SetupExpressionNode } from '../../nodes/setup/SetupExpressionNode.js';

export class SetupExpressionNodeBuilder implements IBuilder<SetupExpressionNode> {
  private setupExpressionNode: SetupExpressionNode;
  private setupExpression: SetupExpressionNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.setupExpressionNode = new SetupExpressionNode(nodeMetadata);
  }

  public withSetupExpression(setupExpression: SetupExpressionNode): SetupExpressionNodeBuilder {
    this.setupExpression = setupExpression;
    return this;
  }

  public build(): SetupExpressionNode {
    this.setupExpressionNode.addChild(this.setupExpression);

    return this.setupExpressionNode;
  }
}
