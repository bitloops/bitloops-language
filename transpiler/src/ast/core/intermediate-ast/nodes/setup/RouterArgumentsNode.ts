import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { RESTServerTypeNode } from '../controllers/restController/RESTServerTypeNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RouterArgumentsNode extends IntermediateASTNode {
  private static classNodeName = 'routerArguments';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterArguments, metadata, RouterArgumentsNode.classNodeName);
  }

  public getServerType(): RESTServerTypeNode {
    const serverType = this.getChildNodeByType<RESTServerTypeNode>(
      BitloopsTypesMapping.TServerType,
    );
    if (!serverType) {
      throw new Error('Rest Server type not found');
    }
    return serverType;
  }
}
