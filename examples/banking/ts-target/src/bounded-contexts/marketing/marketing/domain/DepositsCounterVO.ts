import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { Rules } from './rules';
import { DomainErrors } from './errors';

interface DepositsCounterProps {
  counter: number;
}

export class DepositsCounterVO extends Domain.ValueObject<DepositsCounterProps> {
  get counter(): number {
    return this.props.counter;
  }

  private constructor(props: DepositsCounterProps) {
    super(props);
  }

  public static create(
    props: DepositsCounterProps,
  ): Either<DepositsCounterVO, DomainErrors.InvalidNumberOfTransactions> {
    const res = Domain.applyRules([new Rules.CounterIsPositiveNumber(props.counter)]);
    if (res) return fail(res);
    return ok(new DepositsCounterVO(props));
  }

  public increment(): Either<DepositsCounterVO, DomainErrors.InvalidNumberOfTransactions> {
    return DepositsCounterVO.create({
      counter: this.counter + 1,
    });
  }
}
