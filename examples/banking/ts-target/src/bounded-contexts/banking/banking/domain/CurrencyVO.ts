import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from './errors';
import { Rules } from './rules';

interface CurrencyProps {
  code: string;
}

export class CurrencyVO extends Domain.ValueObject<CurrencyProps> {
  get code(): string {
    return this.props.code;
  }

  private constructor(props: CurrencyProps) {
    super(props);
  }

  public static create(props: CurrencyProps): Either<CurrencyVO, DomainErrors.InvalidCurrency> {
    const res = Domain.applyRules([new Rules.InvalidCurrencyError(props.title)]);
    if (res) return fail(res);
    return ok(new CurrencyVO(props));
  }
}
