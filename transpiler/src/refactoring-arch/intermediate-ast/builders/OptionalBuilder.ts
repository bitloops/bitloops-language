import { TOptional } from '../../../types.js';
import { OptionalNode } from '../nodes/OptionalNode.js';
import { IBuilder } from './IBuilder.js';

export class OptionalBuilder implements IBuilder<OptionalNode> {
  public readonly NAME = 'optional';

  private optionalNode: OptionalNode;
  private optional: TOptional;

  constructor() {
    this.optionalNode = new OptionalNode();
  }

  public withOptional(optional: TOptional): OptionalBuilder {
    this.optional = optional;
    return this;
  }

  public build(): OptionalNode {
    this.optionalNode.buildLeafValue(this.optional);

    return this.optionalNode;
  }
}
