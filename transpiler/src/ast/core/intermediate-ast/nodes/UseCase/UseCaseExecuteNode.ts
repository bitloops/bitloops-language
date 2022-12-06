import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class UseCaseExecuteNode extends IntermediateASTNode {
  private static classNodeName = 'execute';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TUseCase, metadata, UseCaseExecuteNode.classNodeName);
  }
}
