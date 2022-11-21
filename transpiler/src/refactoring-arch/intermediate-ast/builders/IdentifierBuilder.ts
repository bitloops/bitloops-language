import { TIdentifier } from '../../../types.js';
import { IdentifierNode } from '../nodes/IdentifierNode.js';
import { IBuilder } from './IBuilder.js';

export class IdentifierBuilder implements IBuilder<IdentifierNode> {
  public readonly NAME = 'identifier';

  private identifierNode: IdentifierNode;
  private name: TIdentifier;

  constructor() {
    this.identifierNode = new IdentifierNode();
  }

  public withName(name: TIdentifier): IdentifierBuilder {
    this.name = name;
    return this;
  }

  public build(): IdentifierNode {
    this.identifierNode.setValue(this.name);

    return this.identifierNode;
  }
}
