import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from './errors';
import { Rules } from './rules';
import { IncompatibleCurrenciesError } from './errors/IncompatibleCurrenciesError';

interface MoneyProps {
  currency: Domain.StandardVO.Currency.Value;
  amount: number;
}

export class MoneyVO extends Domain.ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }

  public static create(
    props: MoneyProps,
  ): Either<MoneyVO, DomainErrors.InvalidMonetaryValue | Domain.StandardVO.Currency.ErrorTypes> {
    const res = Domain.applyRules([
      new Rules.AmountIsPositiveNumber(props.amount.toString()),
      new Rules.BalanceAmountOutOfBounds(props.amount),
    ]);
    if (res) return fail(res);
    return ok(new MoneyVO(props));
  }

  get currency(): Domain.StandardVO.Currency.Value {
    return this.props.currency;
  }

  get amount(): number {
    return this.props.amount;
  }

  public deduct(amount: MoneyVO): Either<MoneyVO, DomainErrors.InvalidMonetaryValue> {
    if (!this.currency.equals(amount.currency)) {
      return fail(
        new IncompatibleCurrenciesError(
          this.props.currency.currencyCode,
          amount.currency.currencyCode,
        ),
      );
    }
    const value = this.props.amount - amount.amount;
    return MoneyVO.create({ amount: value, currency: this.props.currency });
  }
}
