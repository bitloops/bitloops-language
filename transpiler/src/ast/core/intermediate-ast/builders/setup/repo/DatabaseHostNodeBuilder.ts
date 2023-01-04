import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { DatabaseHostNode } from '../../../nodes/setup/repo/DatabaseHostNode.js';
import { IBuilder } from '../../IBuilder.js';

export class DatabaseHostNodeBuilder implements IBuilder<DatabaseHostNode> {
  private databaseHostNode: DatabaseHostNode;
  private value: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.databaseHostNode = new DatabaseHostNode(metadata);
  }

  public withValue(value: ExpressionNode): DatabaseHostNodeBuilder {
    this.value = value;
    return this;
  }

  public build(): DatabaseHostNode {
    this.databaseHostNode.addChild(this.value);
    this.databaseHostNode.buildObjectValue();

    return this.databaseHostNode;
  }
}
