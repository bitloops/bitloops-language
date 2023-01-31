import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from './errors';
import { Rules } from './rules';
import { CurrencyVO } from './CurrencyVO';

interface MoneyProps {
  currency: CurrencyVO;
  amount: number;
}

export class MoneyVO extends Domain.ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }

  public static create(props: MoneyProps): Either<MoneyVO, DomainErrors.InvalidMonetaryValue> {
    const res = Domain.applyRules([
      new Rules.AmountIsPositiveNumber(props.amount.toString()),
      new Rules.BalanceAmountOutOfBounds(props.amount),
    ]);
    if (res) return fail(res);
    return ok(new MoneyVO(props));
  }

  get currency(): CurrencyVO {
    return this.props.currency;
  }

  get amount(): number {
    return this.props.amount;
  }
}
