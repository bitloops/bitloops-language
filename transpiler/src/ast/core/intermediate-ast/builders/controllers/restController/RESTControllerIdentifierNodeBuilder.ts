import { RESTControllerIdentifierNode } from '../../../nodes/controllers/restController/RESTControllerIdentifierNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class RESTControllerIdentifierNodeBuilder implements IBuilder<RESTControllerIdentifierNode> {
  private restIdentifierNode: RESTControllerIdentifierNode;
  private name: string;

  constructor(metadata: TNodeMetadata) {
    this.restIdentifierNode = new RESTControllerIdentifierNode(metadata);
  }

  public withName(identifierName: string): RESTControllerIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): RESTControllerIdentifierNode {
    this.restIdentifierNode.buildLeafValue(this.name);

    return this.restIdentifierNode;
  }
}
