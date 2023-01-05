import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { repoAdapterDefinitionKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RepoAdapterDefinitionNode extends IntermediateASTNode {
  private static classNodeName = repoAdapterDefinitionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoAdapterDefinition,
      metadata,
      RepoAdapterDefinitionNode.classNodeName,
    );
  }
}
