import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RestServerPortNode extends IntermediateASTNode {
  private static classNodeName = 'restServerPort';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRestServerPort, metadata, RestServerPortNode.classNodeName);
  }
}
