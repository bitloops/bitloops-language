import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { repoAdapterClassNameKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RepoAdapterClassNameNode extends IntermediateASTNode {
  private static classNodeName = repoAdapterClassNameKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoAdapterClassName,
      metadata,
      RepoAdapterClassNameNode.classNodeName,
    );
  }
}
