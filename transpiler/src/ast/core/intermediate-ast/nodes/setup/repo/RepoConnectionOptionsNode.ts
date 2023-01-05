import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { RepoConnectionOptionsKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RepoConnectionOptionsNode extends IntermediateASTNode {
  private static classNodeName = RepoConnectionOptionsKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoConnectionOptions,
      metadata,
      RepoConnectionOptionsNode.classNodeName,
    );
  }
}
