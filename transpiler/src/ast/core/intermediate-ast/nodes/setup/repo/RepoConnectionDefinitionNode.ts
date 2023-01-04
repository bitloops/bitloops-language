import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { RepoConnectionDefinitionKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RepoConnectionDefinitionNode extends IntermediateASTNode {
  private static classNodeName = RepoConnectionDefinitionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoConnectionDefinition,
      metadata,
      RepoConnectionDefinitionNode.classNodeName,
    );
  }
}
