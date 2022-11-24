import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class BitloopsPrimaryTypeNode extends IntermediateASTNode {
  private static classNodeName = 'type';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TBitloopsPrimaryType,
      metadata,
      BitloopsPrimaryTypeNode.classNodeName,
    );
  }
}
