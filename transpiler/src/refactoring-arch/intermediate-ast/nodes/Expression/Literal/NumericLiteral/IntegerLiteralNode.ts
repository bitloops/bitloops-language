import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TBitloopsPrimitives } from '../../../../../../types.js';
import { NumericLiteralNode } from './NumericLiteral.js';

export type IntegerLiteralValue = {
  integerLiteral: {
    type: TBitloopsPrimitives;
    value: string;
  };
};

const NAME = 'integerLiteral';
export class IntegerLiteralNode extends NumericLiteralNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TIntegerLiteral, { lines: lines! }, NAME);
  }
  public getType(): TBitloopsPrimitives {
    return this.getChildren()[0].getValue();
  }
}
