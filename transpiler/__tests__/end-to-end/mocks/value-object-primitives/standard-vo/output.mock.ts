import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { MoneyProps } from './money.props';
import { AmountVO, TAmountVOPrimitives } from './amount.value-object';
export type TMoneyVOPrimitives = {
  currency: string;
  amount: TAmountVOPrimitives;
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
  get amount(): AmountVO {
    return this.props.amount;
  }
  public static fromPrimitives(data: TMoneyVOPrimitives): MoneyVO {
    const MoneyVOProps = {
      currency: Domain.StandardVO.Currency.Value.create({
        currencyCode: data.currency,
      }).value as Domain.StandardVO.Currency.Value,
      amount: AmountVO.fromPrimitives(data.amount),
    };
    return new MoneyVO(MoneyVOProps);
  }
  public toPrimitives(): TMoneyVOPrimitives {
    return {
      currency: this.currency.currencyCode,
      amount: this.amount.toPrimitives(),
    };
  }
}
