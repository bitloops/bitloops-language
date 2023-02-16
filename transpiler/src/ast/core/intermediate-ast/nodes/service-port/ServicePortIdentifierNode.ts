import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ServicePortIdentifierKey } from '../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ServicePortIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = ServicePortIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TServicePortIdentifier,
      ServicePortIdentifierNode.classNodeName,
      metadata,
    );
  }
}
