import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { PropsIdentifierKey } from '../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class PropsIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = PropsIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPropsIdentifier, PropsIdentifierNode.classNodeName, metadata);
  }
}
