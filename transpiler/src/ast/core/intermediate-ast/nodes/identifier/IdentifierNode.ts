import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

const NAME = 'identifier';
export class IdentifierNode extends IntermediateASTIdentifierNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TIdentifier, NAME, metadata);
  }
}
