import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { RestServerPortNode } from '../../nodes/setup/RestServerPortNode.js';

export class RestServerPortNodeBuilder implements IBuilder<RestServerPortNode> {
  private restServerPortNode: RestServerPortNode;
  private portExpression: ExpressionNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.restServerPortNode = new RestServerPortNode(nodeMetadata);
  }

  public withPort(portExpression: ExpressionNode): RestServerPortNodeBuilder {
    this.portExpression = portExpression;
    return this;
  }

  public build(): RestServerPortNode {
    if (this.portExpression) {
      this.restServerPortNode.addChild(this.portExpression);
    }

    this.restServerPortNode.buildObjectValue();

    return this.restServerPortNode;
  }
}
