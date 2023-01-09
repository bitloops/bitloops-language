import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';
import { BoundedContextNameNode } from '../../nodes/setup/BoundedContextNameNode.js';
import { ModuleNameNode } from '../../nodes/setup/ModuleNameNode.js';
import { IBuilder } from '../IBuilder.js';

export class BoundedContextModuleNodeBuilder implements IBuilder<BoundedContextModuleNode> {
  private bcNode: BoundedContextNameNode;
  private moduleNode: ModuleNameNode;
  private bcModuleNode: BoundedContextModuleNode;

  constructor(metadata?: TNodeMetadata) {
    this.bcModuleNode = new BoundedContextModuleNode(metadata);
  }

  public withBoundedContext(bcNode: BoundedContextNameNode): BoundedContextModuleNodeBuilder {
    this.bcNode = bcNode;
    return this;
  }

  public withModule(moduleNode: ModuleNameNode): BoundedContextModuleNodeBuilder {
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
