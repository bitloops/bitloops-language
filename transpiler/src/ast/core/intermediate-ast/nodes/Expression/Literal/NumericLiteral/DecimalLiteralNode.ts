import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { bitloopsPrimitivesObj } from '../../../../../../../types.js';
import { TNodeMetadata } from '../../../IntermediateASTNode.js';
import { NumericLiteralNode } from './NumericLiteral.js';

const NAME = 'decimalLiteral';
export class DecimalLiteralNode extends NumericLiteralNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = NAME;
    this.nodeType = BitloopsTypesMapping.TDecimalLiteral;
  }
  public getInferredType(): string {
    return bitloopsPrimitivesObj.float;
  }
}
