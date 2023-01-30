import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { concretedRepoPortKey } from '../../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class ConcretedRepoPortNode extends IntermediateASTIdentifierNode {
  private static classNodeName = concretedRepoPortKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TConcretedRepoPort, ConcretedRepoPortNode.classNodeName, metadata);
  }
}
