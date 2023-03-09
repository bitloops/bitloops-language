import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ApiDeclarationNode } from '../../../nodes/setup/Api/ApiDeclarationNode.js';
import { WordsWithSpacesNode } from '../../../nodes/setup/WordsWithSpacesNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ApiDeclarationNodeBuilder implements IBuilder<ApiDeclarationNode> {
  private apiIdentifierNode: WordsWithSpacesNode;
  private apiDeclarationNode: ApiDeclarationNode;

  constructor(metadata?: TNodeMetadata) {
    this.apiDeclarationNode = new ApiDeclarationNode(metadata);
  }

  public withApiIdentifier(apiIdentifierNode: WordsWithSpacesNode): ApiDeclarationNodeBuilder {
    this.apiIdentifierNode = apiIdentifierNode;
    return this;
  }

  public build(): ApiDeclarationNode {
    this.apiDeclarationNode.addChild(this.apiIdentifierNode);

    this.apiDeclarationNode.buildObjectValue();

    return this.apiDeclarationNode;
  }
}
