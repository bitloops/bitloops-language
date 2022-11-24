import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TBitloopsPrimitives } from '../../../../../../types.js';
import { TNodeMetadata } from '../../../IntermediateASTNode.js';
import { NumericLiteralNode } from './NumericLiteral.js';

export type IntegerLiteralValue = {
  integerLiteral: {
    type: TBitloopsPrimitives;
    value: string;
  };
};

const NAME = 'integerLiteral';
export class IntegerLiteralNode extends NumericLiteralNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = NAME;
    this.nodeType = BitloopsTypesMapping.TIntegerLiteral;
  }
  public getType(): TBitloopsPrimitives {
    return this.getChildren()[0].getValue();
  }
}
