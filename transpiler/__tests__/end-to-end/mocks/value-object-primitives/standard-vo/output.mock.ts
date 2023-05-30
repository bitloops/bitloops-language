import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { MoneyProps } from './money.props';
export type TMoneyVOPrimitives = {
  currency: any;
  amount: number;
};
export class MoneyVO extends Domain.ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }
  public static create(props: MoneyProps): Either<MoneyVO, never> {
    return ok(new MoneyVO(props));
  }
  get currency(): Domain.StandardVO.Currency.Value {
    return this.props.currency;
  }
  get amount(): number {
    return this.props.amount;
  }
  public static fromPrimitives(data: TMoneyVOPrimitives): MoneyVO {
    const MoneyVOProps = {
      currency: Domain.StandardVO.Currency.Value.fromPrimitives(data.currency),
      amount: data.amount,
    };
    return new MoneyVO(MoneyVOProps);
  }
  public toPrimitives(): TMoneyVOPrimitives {
    return {
      currency: this.currency.toPrimitives(),
      amount: this.amount,
    };
  }
}
