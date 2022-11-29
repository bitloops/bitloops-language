import { TAdditiveOperator, TEqualityOperator, TRelationalOperator } from '../../../../../types.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { IBuilder } from '../IBuilder.js';

export class OperatorBuilder implements IBuilder<OperatorNode> {
  public readonly NAME = 'operator';

  private operatorNode: OperatorNode;
  private symbol: TAdditiveOperator | TRelationalOperator | TEqualityOperator;

  constructor() {
    this.operatorNode = new OperatorNode();
  }

  public withSymbol(
    symbol: TAdditiveOperator | TRelationalOperator | TEqualityOperator,
  ): OperatorBuilder {
    this.symbol = symbol;
    return this;
  }

  public build(): OperatorNode {
    this.operatorNode.buildLeafValue(this.symbol);
    return this.operatorNode;
  }
}
