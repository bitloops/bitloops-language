import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { BoundedContextNameNode } from '../../nodes/setup/BoundedContextNameNode.js';
import { WordsWithSpacesNode } from '../../nodes/setup/WordsWithSpacesNode.js';
import { IBuilder } from '../IBuilder.js';

export class BoundedContextNameNodeBuilder implements IBuilder<BoundedContextNameNode> {
  private nameNode: WordsWithSpacesNode;
  private bcNode: BoundedContextNameNode;

  constructor(metadata?: TNodeMetadata) {
    this.bcNode = new BoundedContextNameNode(metadata);
  }

  public withName(nameNode: WordsWithSpacesNode): BoundedContextNameNodeBuilder {
    this.nameNode = nameNode;
    return this;
  }

  public build(): BoundedContextNameNode {
    this.bcNode.addChild(this.nameNode);

    this.bcNode.buildObjectValue();

    return this.bcNode;
  }
}
