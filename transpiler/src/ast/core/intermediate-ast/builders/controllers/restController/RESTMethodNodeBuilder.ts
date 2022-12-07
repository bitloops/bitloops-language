import { TRestMethods } from '../../../../../../types.js';
import { RESTMethodNode } from '../../../nodes/controllers/restController/RESTMethodNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class RESTMethodNodeBuilder implements IBuilder<RESTMethodNode> {
  private restMethodNode: RESTMethodNode;
  private method: TRestMethods;

  constructor(metadata: TNodeMetadata) {
    this.restMethodNode = new RESTMethodNode(metadata);
  }

  public withMethod(method: TRestMethods): RESTMethodNodeBuilder {
    this.method = method;
    return this;
  }

  public build(): RESTMethodNode {
    this.restMethodNode.buildLeafValue(this.method);

    return this.restMethodNode;
  }
}
