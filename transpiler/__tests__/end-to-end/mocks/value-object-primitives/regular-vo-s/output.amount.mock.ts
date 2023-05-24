import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AmountProps } from './amount.props';
export type TAmountVOPrimitives = {
  value: number;
};
export class AmountVO extends Domain.ValueObject<AmountProps> {
  private constructor(props: AmountProps) {
    super(props);
  }
  public static create(props: AmountProps): Either<AmountVO, never> {
    return ok(new AmountVO(props));
  }
  get value(): number {
    return this.props.value;
  }
  public static fromPrimitives(data: TAmountVOPrimitives): AmountVO {
    const AmountVOProps = { value: data.value };
    return new AmountVO(AmountVOProps);
  }
  public toPrimitives(): TAmountVOPrimitives {
    return {
      value: this.value,
    };
  }
}
