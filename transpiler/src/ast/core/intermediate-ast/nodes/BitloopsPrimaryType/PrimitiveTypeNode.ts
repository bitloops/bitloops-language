import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import {
  TBitloopsPrimitives,
  TBitloopsPrimitivesObject,
  primitivesTypeKey,
} from '../../../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class PrimitiveTypeNode extends BitloopsPrimaryTypeNode {
  private static primitiveClassNodeName = 'primitiveType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = PrimitiveTypeNode.primitiveClassNodeName;
    this.nodeType = BitloopsTypesMapping.TBitloopsPrimitives;
  }

  public getTypeValue(): TBitloopsPrimitives {
    const classNodeName = PrimitiveTypeNode.primitiveClassNodeName;
    const value = this.getValue();
    const typeValue = value[classNodeName];
    return typeValue;
  }

  public getInferredType(): string {
    const primitiveType = (this.getValue() as TBitloopsPrimitivesObject)[primitivesTypeKey];
    return primitiveType;
  }
}
