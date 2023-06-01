import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsIdentifierTypeNode } from './BitloopsIdentifierTypeNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';
import { BuiltInClassTypeNode } from './BuildInClassTypeNode.js';
import { PrimitiveTypeNode } from './PrimitiveTypeNode.js';
import { StandardValueTypeNode } from './StandardValueTypeNode.js';

export class ArrayPrimaryTypeNode extends BitloopsPrimaryTypeNode {
  private static arrayClassNodeName = 'arrayPrimaryType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = ArrayPrimaryTypeNode.arrayClassNodeName;
    this.nodeType = BitloopsTypesMapping.ArrayBitloopsPrimType;
  }

  getBitloopsIdentifierTypeNode(): BitloopsIdentifierTypeNode {
    const primaryType = this.getChildNodeByType<BitloopsIdentifierTypeNode>(
      BitloopsTypesMapping.TBitloopsIdentifier,
    );
    return primaryType;
  }

  getPrimitiveTypeNode(): PrimitiveTypeNode {
    const primaryType = this.getChildNodeByType<PrimitiveTypeNode>(
      BitloopsTypesMapping.TBitloopsPrimitives,
    );
    return primaryType;
  }

  getStandardValueTypeNode(): StandardValueTypeNode {
    const primaryType = this.getChildNodeByType<StandardValueTypeNode>(
      BitloopsTypesMapping.TStandardValueType,
    );
    return primaryType;
  }

  getBuiltInClassTypeNode(): BuiltInClassTypeNode {
    const primaryType = this.getChildNodeByType<BuiltInClassTypeNode>(
      BitloopsTypesMapping.TBitloopsBuiltInClasses,
    );
    return primaryType;
  }

  //children of ArrayPrimaryTypeNode can be BitloopsIdentifierTypeNode, PrimitiveTypeNode, StandardValueTypeNode, BuiltInClassTypeNode
  //so check which of them exists and return it
  getPrimaryTypeNode():
    | BitloopsIdentifierTypeNode
    | PrimitiveTypeNode
    | StandardValueTypeNode
    | BuiltInClassTypeNode {
    const bitloopsIdentifierType = this.getBitloopsIdentifierTypeNode();
    const primitiveType = this.getPrimitiveTypeNode();
    const standardValueType = this.getStandardValueTypeNode();
    const builtInClassType = this.getBuiltInClassTypeNode();
    if (bitloopsIdentifierType) {
      return bitloopsIdentifierType;
    }
    if (primitiveType) {
      return primitiveType;
    }
    if (standardValueType) {
      return standardValueType;
    }
    if (builtInClassType) {
      return builtInClassType;
    }
    throw new Error('No primary type found');
  }

  public getInferredType(): string {
    const primaryTypeNode = this.getPrimaryTypeNode();
    return primaryTypeNode.getInferredType() + '[]';
  }
}
