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

  isPrimaryWithPrimitiveTypeChild(): boolean {
    if (this.getNodeType() !== BitloopsTypesMapping.TBitloopsPrimaryType) {
      return false;
    }
    const child = this.getChildNodeByType<PrimitiveTypeNode>(
      BitloopsTypesMapping.TBitloopsPrimitives,
    );
    return !!child;
  }

  isPrimaryWithBitloopsIdentifierTypeChild(): boolean {
    if (this.getNodeType() !== BitloopsTypesMapping.TBitloopsPrimaryType) {
      return false;
    }
    const child = this.getChildNodeByType<BitloopsIdentifierTypeNode>(
      BitloopsTypesMapping.TBitloopsIdentifier,
    );
    return !!child;
  }

  getPrimitiveTypeNode(): PrimitiveTypeNode {
    if (this.isPrimitiveType()) {
      return this;
    }
    if (this.isPrimaryWithPrimitiveTypeChild()) {
      return this.getChildNodeByType<PrimitiveTypeNode>(BitloopsTypesMapping.TBitloopsPrimitives);
    }
    throw new Error('This is not a primitive type node');
  }

  getBitloopsIdentifierTypeNode(): BitloopsIdentifierTypeNode {
    if (this.isBitloopsIdentifierType()) {
      return this;
    }
    if (this.isPrimaryWithBitloopsIdentifierTypeChild()) {
      return this.getChildNodeByType<BitloopsIdentifierTypeNode>(
        BitloopsTypesMapping.TBitloopsIdentifier,
      );
    }
    throw new Error('This is not a BitloopsIdentifier type node');
  }

  public isRepoPort(): boolean {
    try {
      const bitloopsIdentifierTypeNode = this.getBitloopsIdentifierTypeNode();
      return bitloopsIdentifierTypeNode.isRepoPortIdentifier();
    } catch (error) {
      return false;
    }
  }
}
