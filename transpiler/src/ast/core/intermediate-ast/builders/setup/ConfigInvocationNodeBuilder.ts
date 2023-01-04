import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { LanguageNode } from '../../nodes/setup/LanguageNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ConfigInvocationNode } from '../../nodes/setup/ConfigInvocationNode.js';
import { IBuilder } from '../IBuilder.js';

export class ConfigInvocationNodeBuilder implements IBuilder<ConfigInvocationNode> {
  private languageNode: LanguageNode;
  private configInvocationNode: ConfigInvocationNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.configInvocationNode = new ConfigInvocationNode(metadata);
  }

  public withLanguage(languageNode: LanguageNode): ConfigInvocationNodeBuilder {
    this.languageNode = languageNode;
    return this;
  }

  public build(): ConfigInvocationNode {
    this.intermediateASTTree.insertChild(this.configInvocationNode);
    this.intermediateASTTree.insertChild(this.languageNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.configInvocationNode.buildObjectValue();

    return this.configInvocationNode;
  }
}
