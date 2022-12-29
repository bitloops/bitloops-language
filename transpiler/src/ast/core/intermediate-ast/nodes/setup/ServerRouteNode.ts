import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ServerRouteNode extends IntermediateASTNode {
  private static classNodeName = 'serverRoute';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRestServerInstanceRouters, metadata, ServerRouteNode.classNodeName);
  }
}
