import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsIdentifierTypeNode } from './BitloopsIdentifierTypeNode.js';
import { PrimitiveTypeNode } from './PrimitiveTypeNode.js';

export class BitloopsPrimaryTypeNode extends IntermediateASTNode {
  private static classNodeName = 'type';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TBitloopsPrimaryType,
      metadata,
      BitloopsPrimaryTypeNode.classNodeName,
    );
  }

  isPrimitiveType(): this is PrimitiveTypeNode {
    return this.getNodeType() === BitloopsTypesMapping.TBitloopsPrimitives;
  }

  isBitloopsIdentifierType(): this is BitloopsIdentifierTypeNode {
    return this.getNodeType() === BitloopsTypesMapping.TBitloopsIdentifier;
  }
}
