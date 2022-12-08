import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { UseCaseIdentifierNode } from '../../nodes/UseCase/UseCaseIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class UseCaseIdentifierNodeBuilder implements IBuilder<UseCaseIdentifierNode> {
  private structIdentifierNode: UseCaseIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.structIdentifierNode = new UseCaseIdentifierNode(metadata);
  }

  public withName(identifierName: string): UseCaseIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): UseCaseIdentifierNode {
    this.structIdentifierNode.buildLeafValue(this.name);

    return this.structIdentifierNode;
  }
}
