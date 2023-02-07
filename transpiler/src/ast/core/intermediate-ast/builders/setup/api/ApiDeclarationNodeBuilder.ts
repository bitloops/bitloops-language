import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ApiDeclarationNode } from '../../../nodes/setup/Api/ApiDeclarationNode.js';
import { ApiIdentifierNode } from '../../../nodes/setup/Api/ApiIdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ApiDeclarationNodeBuilder implements IBuilder<ApiDeclarationNode> {
  private apiIdentifierNode: ApiIdentifierNode;
  private apiDeclarationNode: ApiDeclarationNode;

  constructor(metadata?: TNodeMetadata) {
    this.apiDeclarationNode = new ApiDeclarationNode(metadata);
  }

  public withApiIdentifier(apiIdentifierNode: ApiIdentifierNode): ApiDeclarationNodeBuilder {
    this.apiIdentifierNode = apiIdentifierNode;
    return this;
  }

  public build(): ApiDeclarationNode {
    this.apiDeclarationNode.addChild(this.apiIdentifierNode);

    this.apiDeclarationNode.buildObjectValue();

    return this.apiDeclarationNode;
  }
}
