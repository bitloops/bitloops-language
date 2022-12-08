import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { RootEntityIdentifierKey } from '../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class RootEntityIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = RootEntityIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRootEntityIdentifier,
      RootEntityIdentifierNode.classNodeName,
      metadata,
    );
  }
}
