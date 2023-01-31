import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
// import { DomainErrors } from './errors';
// import { Rules } from './rules';

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

  public static create(props: CurrencyProps): Either<CurrencyVO, never> {
    // const res = Domain.applyRules([new Rules.(props.title)]);
    // if (res) return fail(res);
    return ok(new CurrencyVO(props));
  }
}
