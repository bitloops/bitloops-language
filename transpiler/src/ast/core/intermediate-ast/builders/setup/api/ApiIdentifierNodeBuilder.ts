import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ApiIdentifierNode } from '../../../nodes/setup/Api/ApiIdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ApiIdentifierNodeBuilder implements IBuilder<ApiIdentifierNode> {
  private apiIdentifierNode: ApiIdentifierNode;
  private identifierName: string;

  constructor(metadata?: TNodeMetadata) {
    this.apiIdentifierNode = new ApiIdentifierNode(metadata);
  }

  public withName(identifierName: string): ApiIdentifierNodeBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public build(): ApiIdentifierNode {
    this.apiIdentifierNode.buildLeafValue(this.identifierName);

    return this.apiIdentifierNode;
  }
}
