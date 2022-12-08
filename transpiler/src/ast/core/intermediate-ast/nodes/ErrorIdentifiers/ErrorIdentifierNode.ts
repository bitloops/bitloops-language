import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ErrorIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'error';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TErrorIdentifier, ErrorIdentifierNode.classNodeName, metadata);
  }
}
