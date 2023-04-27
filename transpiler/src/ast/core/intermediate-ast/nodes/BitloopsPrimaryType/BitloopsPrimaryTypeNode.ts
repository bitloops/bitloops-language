import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TInferredTypes } from '../../../../../semantic-analysis/type-inference/types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ArrayPrimaryTypeNode } from './ArrayPrimaryTypeNode.js';
import { BitloopsIdentifierTypeNode } from './BitloopsIdentifierTypeNode.js';
import { BuiltInClassTypeNode } from './BuildInClassTypeNode.js';
import { PrimitiveTypeNode } from './PrimitiveTypeNode.js';
import { StandardValueTypeNode } from './StandardValueTypeNode.js';

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

  isBuiltInClassType(): this is BuiltInClassTypeNode {
    return this.getNodeType() === BitloopsTypesMapping.TBitloopsBuiltInClasses;
  }

  isArrayPrimaryType(): this is ArrayPrimaryTypeNode {
    return this.getNodeType() === BitloopsTypesMapping.ArrayBitloopsPrimType;
  }

  isStandardValueType(): this is StandardValueTypeNode {
    return this.getNodeType() === BitloopsTypesMapping.TStandardValueType;
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

  public getInferredType(): TInferredTypes {
    // const primaryTypeNode = this.getChildNodeByType<BitloopsPrimaryTypeNode>(
    //   BitloopsTypesMapping.TBitloopsPrimaryType,
    // );
    // for (const child of primaryTypeNode.getChildren()) {
    //   if (child instanceof BitloopsPrimaryTypeNode) {
    if (this.isArrayPrimaryType()) {
      const primaryTypeNode = this.getPrimaryTypeNode();
      return primaryTypeNode.getInferredType();
    } else {
      return this.getValue();
    }
    //   } else {
    //     throw new Error('Not instance of BitloopsPrimaryTypeNode');
    //   }
    // }
    // throw new Error('No children found for primary type node');
  }
}
