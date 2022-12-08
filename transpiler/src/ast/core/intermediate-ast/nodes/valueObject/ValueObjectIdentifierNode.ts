import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ValueObjectIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'valueObjectIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TValueObjectIdentifier,
      ValueObjectIdentifierNode.classNodeName,
      metadata,
    );
  }
}
