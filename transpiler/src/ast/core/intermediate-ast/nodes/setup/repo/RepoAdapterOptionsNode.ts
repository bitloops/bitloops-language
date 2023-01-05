import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { repoAdapterOptionsKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RepoAdapterOptionsNode extends IntermediateASTNode {
  private static classNodeName = repoAdapterOptionsKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRepoAdapterOptions, metadata, RepoAdapterOptionsNode.classNodeName);
  }
}
