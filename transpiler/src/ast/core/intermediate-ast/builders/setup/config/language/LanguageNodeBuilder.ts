import { TLanguage } from '../../../../../../../types.js';
import { LanguageNode } from '../../../../nodes/setup/config/language/LanguageNode.js';
import { TNodeMetadata } from '../../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class LanguageNodeBuilder implements IBuilder<LanguageNode> {
  private languageNode: LanguageNode;
  private name: TLanguage;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.languageNode = new LanguageNode(nodeMetadata);
  }

  public withName(name: TLanguage): LanguageNodeBuilder {
    this.name = name;
    return this;
  }

  public build(): LanguageNode {
    this.languageNode.buildLeafValue(this.name);

    return this.languageNode;
  }
}
