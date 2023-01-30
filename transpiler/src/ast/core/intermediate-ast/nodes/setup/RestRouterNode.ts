import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RestRouterNode extends IntermediateASTNode {
  private static classNodeName = 'restRouter';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRestRouter, metadata, RestRouterNode.classNodeName);
  }
}
