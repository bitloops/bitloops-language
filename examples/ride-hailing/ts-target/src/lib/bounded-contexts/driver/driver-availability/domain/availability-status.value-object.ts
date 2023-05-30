import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AvailabilityStatusProps } from './availability-status.props';
export type TAvailabilityStatusVOPrimitives = {
  status: string;
};
export class AvailabilityStatusVO extends Domain.ValueObject<AvailabilityStatusProps> {
  private constructor(props: AvailabilityStatusProps) {
    super(props);
  }
  public static create(
    props: AvailabilityStatusProps
  ): Either<AvailabilityStatusVO, never> {
    return ok(new AvailabilityStatusVO(props));
  }
  get status(): string {
    return this.props.status;
  }
  public static fromPrimitives(
    data: TAvailabilityStatusVOPrimitives
  ): AvailabilityStatusVO {
    const AvailabilityStatusVOProps = { status: data.status };
    return new AvailabilityStatusVO(AvailabilityStatusVOProps);
  }
  public toPrimitives(): TAvailabilityStatusVOPrimitives {
    return {
      status: this.status,
    };
  }
}
