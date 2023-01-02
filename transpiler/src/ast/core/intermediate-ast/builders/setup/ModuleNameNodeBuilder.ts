import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ModuleNameNode } from '../../nodes/setup/ModuleNameNode.js';
import { WordsWithSpacesNode } from '../../nodes/setup/WordsWithSpacesNode.js';
import { IBuilder } from '../IBuilder.js';

export class ModuleNameNodeBuilder implements IBuilder<ModuleNameNode> {
  private nameNode: WordsWithSpacesNode;
  private moduleNode: ModuleNameNode;

  constructor(metadata?: TNodeMetadata) {
    this.moduleNode = new ModuleNameNode(metadata);
  }

  public withName(nameNode: WordsWithSpacesNode): ModuleNameNodeBuilder {
    this.nameNode = nameNode;
    return this;
  }

  public build(): ModuleNameNode {
    this.moduleNode.addChild(this.nameNode);

    this.moduleNode.buildObjectValue();

    return this.moduleNode;
  }
}
