import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { StaticNode } from '../../nodes/methods/StaticNode.js';
import { IBuilder } from '../IBuilder.js';

export class StaticNodeBuilder implements IBuilder<StaticNode> {
  private staticNode: StaticNode;
  private value: boolean;

  constructor(metadata?: TNodeMetadata) {
    this.staticNode = new StaticNode(metadata);
  }

  public withValue(value: boolean): StaticNodeBuilder {
    this.value = value;
    return this;
  }

  public build(): StaticNode {
    this.staticNode.buildLeafValue(this.value);

    return this.staticNode;
  }
}
