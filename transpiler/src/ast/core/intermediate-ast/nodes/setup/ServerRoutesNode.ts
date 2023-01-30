import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ServerRoutesNode extends IntermediateASTNode {
  private static classNodeName = 'serverRoutes';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRestServerInstanceRouters,
      metadata,
      ServerRoutesNode.classNodeName,
    );
  }
}
