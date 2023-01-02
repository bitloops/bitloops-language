import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { BoundedContextNode } from '../../nodes/setup/BoundedContextNode.js';
import { WordsWithSpacesNode } from '../../nodes/setup/WordsWithSpacesNode.js';
import { IBuilder } from '../IBuilder.js';

export class BoundedContextNodeBuilder implements IBuilder<BoundedContextNode> {
  private nameNode: WordsWithSpacesNode;
  private bcNode: BoundedContextNode;

  constructor(metadata?: TNodeMetadata) {
    this.bcNode = new BoundedContextNode(metadata);
  }

  public withName(nameNode: WordsWithSpacesNode): BoundedContextNodeBuilder {
    this.nameNode = nameNode;
    return this;
  }

  public build(): BoundedContextNode {
    this.bcNode.addChild(this.nameNode);

    this.bcNode.buildObjectValue();

    return this.bcNode;
  }
}
