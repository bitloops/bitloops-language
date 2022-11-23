import { DTOIdentifierNode } from '../../nodes/DTO/DTOIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class DTOIdentifierNodeBuilder implements IBuilder<DTOIdentifierNode> {
  private dtoIdentifierNode: DTOIdentifierNode;
  private name: string;

  constructor() {
    this.dtoIdentifierNode = new DTOIdentifierNode();
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
