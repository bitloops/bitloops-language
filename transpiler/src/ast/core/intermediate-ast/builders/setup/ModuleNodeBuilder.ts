import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ModuleNode } from '../../nodes/setup/ModuleNode.js';
import { WordsWithSpacesNode } from '../../nodes/setup/WordsWithSpacesNode.js';
import { IBuilder } from '../IBuilder.js';

export class ModuleNodeBuilder implements IBuilder<ModuleNode> {
  private nameNode: WordsWithSpacesNode;
  private moduleNode: ModuleNode;

  constructor(metadata?: TNodeMetadata) {
    this.moduleNode = new ModuleNode(metadata);
  }

  public withName(nameNode: WordsWithSpacesNode): ModuleNodeBuilder {
    this.nameNode = nameNode;
    return this;
  }

  public build(): ModuleNode {
    this.moduleNode.addChild(this.nameNode);

    this.moduleNode.buildObjectValue();

    return this.moduleNode;
  }
}
