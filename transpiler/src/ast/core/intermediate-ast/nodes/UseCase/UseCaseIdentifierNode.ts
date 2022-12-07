import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { UseCaseIdentifierKey } from '../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class UseCaseIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = UseCaseIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TUseCaseIdentifier, UseCaseIdentifierNode.classNodeName, metadata);
  }
}
