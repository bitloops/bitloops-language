import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from './errors';
import { Rules } from './rules';

interface PINProps {
  pin: string;
}

export class PINVO extends Domain.ValueObject<PINProps> {
  get pin(): string {
    return this.props.pin;
  }

  private constructor(props: PINProps) {
    super(props);
  }

  public static create(props: PINProps): Either<PINVO, DomainErrors.InvalidEmail> {
    const res = Domain.applyRules([
      // TODO check if 2 rules work
      new Rules.PINIsPositiveNumber(props.pin),
      new Rules.PINHasLengthOfFour(props.pin),
    ]);
    if (res) return fail(res);
    return ok(new PINVO(props));
  }
}
