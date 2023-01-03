import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';
import { WordsWithSpacesNode } from '../../nodes/setup/WordsWithSpacesNode.js';
import { IBuilder } from '../IBuilder.js';

export class BoundedContextModuleNodeBuilder implements IBuilder<BoundedContextModuleNode> {
  private bcNode: WordsWithSpacesNode;
  private moduleNode: WordsWithSpacesNode;
  private bcModuleNode: BoundedContextModuleNode;

  constructor(metadata?: TNodeMetadata) {
    this.bcModuleNode = new BoundedContextModuleNode(metadata);
  }

  public withBoundedContext(bcNode: WordsWithSpacesNode): BoundedContextModuleNodeBuilder {
    this.bcNode = bcNode;
    return this;
  }

  public withModule(moduleNode: WordsWithSpacesNode): BoundedContextModuleNodeBuilder {
    this.moduleNode = moduleNode;
    return this;
  }

  public build(): BoundedContextModuleNode {
    this.bcModuleNode.addChild(this.bcNode);
    this.bcModuleNode.addChild(this.moduleNode);

    this.bcModuleNode.buildObjectValue();

    return this.bcModuleNode;
  }
}
