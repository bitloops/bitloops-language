import { TRepoSupportedTypes } from '../../../../../../types.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { DatabaseTypeNode } from '../../../nodes/setup/repo/DatabaseTypeNode.js';
import { IBuilder } from '../../IBuilder.js';

export class DatabaseTypeNodeBuilder implements IBuilder<DatabaseTypeNode> {
  private databaseTypeNode: DatabaseTypeNode;
  private value: TRepoSupportedTypes;

  constructor(metadata?: TNodeMetadata) {
    this.databaseTypeNode = new DatabaseTypeNode(metadata);
  }

  public withValue(value: TRepoSupportedTypes): DatabaseTypeNodeBuilder {
    this.value = value;
    return this;
  }

  public build(): DatabaseTypeNode {
    this.databaseTypeNode.buildLeafValue(this.value);

    return this.databaseTypeNode;
  }
}
