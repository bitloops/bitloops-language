import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ReadModelIdentifierKey } from '../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ReadModelIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = ReadModelIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TReadModelIdentifier,
      ReadModelIdentifierNode.classNodeName,
      metadata,
    );
  }
}
