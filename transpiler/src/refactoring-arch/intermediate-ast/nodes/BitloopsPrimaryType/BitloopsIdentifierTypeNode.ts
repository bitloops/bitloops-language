import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class BitloopsIdentifierTypeNode extends BitloopsPrimaryTypeNode {
  private static blIdentifierClassNodeName = 'bitloopsIdentifierType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = BitloopsIdentifierTypeNode.blIdentifierClassNodeName;
    this.nodeType = BitloopsTypesMapping.TBitloopsIdentifier;
  }
}
