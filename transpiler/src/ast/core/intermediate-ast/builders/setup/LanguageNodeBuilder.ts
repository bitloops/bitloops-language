import { TIdentifier } from '../../../../../types.js';
import { IBuilder } from '../IBuilder.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { LanguageNode } from '../nodes/LanguageNode.js';

export class LanguageNodeBuilder implements IBuilder<LanguageNode> {
  public readonly NAME = 'identifier';

  private languageNode: LanguageNode;
  private languageName: TIdentifier;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.languageNode = new LanguageNode(nodeMetadata);
  }

  public withLanguage(languageName: TIdentifier): LanguageNodeBuilder {
    this.languageName = languageName;
    return this;
  }

  public build(): IdentifierNode {
    this.languageNode.buildLeafValue(this.languageName);

    return this.languageNode;
  }
}
