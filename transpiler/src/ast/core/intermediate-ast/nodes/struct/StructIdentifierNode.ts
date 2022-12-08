import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { structIdentifierKey } from '../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class StructIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = structIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TStructIdentifier, StructIdentifierNode.classNodeName, metadata);
  }
}
