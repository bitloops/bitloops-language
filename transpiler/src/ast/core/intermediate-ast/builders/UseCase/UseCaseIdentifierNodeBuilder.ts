import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { UseCaseIdentifierNode } from '../../nodes/UseCase/UseCaseIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class UseCaseIdentifierNodeBuilder implements IBuilder<UseCaseIdentifierNode> {
  private useCaseIdentifierNode: UseCaseIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.useCaseIdentifierNode = new UseCaseIdentifierNode(metadata);
  }

  public withName(identifierName: string): UseCaseIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): UseCaseIdentifierNode {
    this.useCaseIdentifierNode.buildLeafValue(this.name);

    return this.useCaseIdentifierNode;
  }
}
