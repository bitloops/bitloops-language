import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { DatabaseNameNode } from '../../../nodes/setup/repo/DatabaseName.js';
import { IBuilder } from '../../IBuilder.js';

export class DatabaseNameNodeBuilder implements IBuilder<DatabaseNameNode> {
  private databaseNameNode: DatabaseNameNode;
  private value: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.databaseNameNode = new DatabaseNameNode(metadata);
  }

  public withValue(value: ExpressionNode): DatabaseNameNodeBuilder {
    this.value = value;
    return this;
  }

  public build(): DatabaseNameNode {
    this.databaseNameNode.addChild(this.value);
    this.databaseNameNode.buildObjectValue();

    return this.databaseNameNode;
  }
}
