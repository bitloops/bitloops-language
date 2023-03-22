import { DTOIdentifierNode } from '../../nodes/DTO/DTOIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DTOIdentifierNodeBuilder implements IBuilder<DTOIdentifierNode> {
  private dtoIdentifierNode: DTOIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.dtoIdentifierNode = new DTOIdentifierNode(metadata);
  }

  public withName(identifierName: string): DTOIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): DTOIdentifierNode {
    this.dtoIdentifierNode.buildLeafValue(this.name);

    return this.dtoIdentifierNode;
  }
}
