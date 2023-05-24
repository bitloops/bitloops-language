import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { MoneyProps } from './money.props';
import { AmountVO, TAmountVOPrimitives } from './amount.value-object';
import { RateVO, TRateVOPrimitives } from './rate.value-object';
export type TMoneyVOPrimitives = {
  currency: string;
  amount: TAmountVOPrimitives;
  denominations: number[];
  rates: TRateVOPrimitives[];
};
export class MoneyVO extends Domain.ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }
  public static create(props: MoneyProps): Either<MoneyVO, never> {
    return ok(new MoneyVO(props));
  }
  get currency(): string {
    return this.props.currency;
  }
  get amount(): AmountVO {
    return this.props.amount;
  }
  get denominations(): number[] {
    return this.props.denominations;
  }
  get rates(): RateVO[] {
    return this.props.rates;
  }
  public static fromPrimitives(data: TMoneyVOPrimitives): MoneyVO {
    const MoneyVOProps = {
      currency: data.currency,
      amount: AmountVO.fromPrimitives(data.amount),
      denominations: data.denominations,
      rates: data.rates.map((x) => RateVO.fromPrimitives(x)),
    };
    return new MoneyVO(MoneyVOProps);
  }
  public toPrimitives(): TMoneyVOPrimitives {
    return {
      currency: this.currency,
      amount: this.amount.toPrimitives(),
      denominations: this.denominations,
      rates: this.rates.map((x) => x.toPrimitives()),
    };
  }
}
