import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { DatabasePortNode } from '../../../nodes/setup/repo/DatabasePortNode.js';
import { IBuilder } from '../../IBuilder.js';

export class DatabasePortNodeBuilder implements IBuilder<DatabasePortNode> {
  private databasePortNode: DatabasePortNode;
  private value: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.databasePortNode = new DatabasePortNode(metadata);
  }

  public withValue(value: ExpressionNode): DatabasePortNodeBuilder {
    this.value = value;
    return this;
  }

  public build(): DatabasePortNode {
    this.databasePortNode.addChild(this.value);
    this.databasePortNode.buildObjectValue();

    return this.databasePortNode;
  }
}
