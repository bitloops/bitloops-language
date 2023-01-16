import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class UseCaseDefinitionNode extends IntermediateASTNode {
  private static classNodeName = 'useCaseDefinition';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TUseCaseDefinition, metadata, UseCaseDefinitionNode.classNodeName);
  }
}
