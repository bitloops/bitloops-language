import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class RepoPortIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'repoPortIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRepoPort, RepoPortIdentifierNode.classNodeName, metadata);
  }
}
