import { EntityIdentifierNode } from '../../nodes/Entity/EntityIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class EntityIdentifierNodeBuilder implements IBuilder<EntityIdentifierNode> {
  private entityIdentifierNode: EntityIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.entityIdentifierNode = new EntityIdentifierNode(metadata);
  }

  public withName(identifierName: string): EntityIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): EntityIdentifierNode {
    this.entityIdentifierNode.buildLeafValue(this.name);

    return this.entityIdentifierNode;
  }
}
