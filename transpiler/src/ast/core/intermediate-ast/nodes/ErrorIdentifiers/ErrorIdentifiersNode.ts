import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ErrorIdentifierNode } from './ErrorIdentifierNode.js';

export class ErrorIdentifiersNode extends IntermediateASTNode {
  private static classNodeName = 'errors';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TErrorIdentifiers, metadata, ErrorIdentifiersNode.classNodeName);
  }

  getErrorIdentifierNodes(): ErrorIdentifierNode[] {
    return this.getChildren() as ErrorIdentifierNode[];
  }
}
