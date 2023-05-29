import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { DriverAvailabilityProps } from './driver-availability.props';
import {
  AccountStatusVO,
  TAccountStatusVOPrimitives,
} from './account-status.value-object';
import {
  AvailabilityStatusVO,
  TAvailabilityStatusVOPrimitives,
} from './availability-status.value-object';
import {
  BlockReasonVO,
  TBlockReasonVOPrimitives,
} from './block-reason.value-object';
import { DomainRules } from './rules/index';
import { DomainErrors } from './errors/index';
export type TDriverAvailabilityEntityPrimitives = {
  id: string;
  accountStatus: TAccountStatusVOPrimitives;
  availabilityStatus: TAvailabilityStatusVOPrimitives;
  blockReason: TBlockReasonVOPrimitives;
};
export class DriverAvailabilityEntity extends Domain.Aggregate<DriverAvailabilityProps> {
  private constructor(props: DriverAvailabilityProps) {
    super(props, props.id);
  }
  public static create(
    props: DriverAvailabilityProps
  ): Either<DriverAvailabilityEntity, never> {
    const driverAvailability = new DriverAvailabilityEntity(props);
    return ok(driverAvailability);
  }
  get id() {
    return this._id;
  }
  get accountStatus(): AccountStatusVO {
    return this.props.accountStatus;
  }
  get availabilityStatus(): AvailabilityStatusVO {
    return this.props.availabilityStatus;
  }
  get blockReason(): BlockReasonVO {
    return this.props.blockReason;
  }
  public becomeAvailable(): Either<void, DomainErrors.AccountIsBlockedError> {
    const res = Domain.applyRules([
      new DomainRules.AccountIsNotBlockedRule(
        this.props.id,
        this.props.accountStatus
      ),
    ]);
    if (res) return fail(res);
    const newStatus = AvailabilityStatusVO.create({ status: 'AVAILABLE' });
    if (newStatus.isFail()) {
      return fail(newStatus.value);
    }
    this.props.availabilityStatus = newStatus.value;
    return ok();
  }
  public becomeUnavailable(): Either<void, never> {
    const newStatus = AvailabilityStatusVO.create({ status: 'UNAVAILABLE' });
    if (newStatus.isFail()) {
      return fail(newStatus.value);
    }
    this.props.availabilityStatus = newStatus.value;
    return ok();
  }
  public static fromPrimitives(
    data: TDriverAvailabilityEntityPrimitives
  ): DriverAvailabilityEntity {
    const DriverAvailabilityEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      accountStatus: AccountStatusVO.fromPrimitives(data.accountStatus),
      availabilityStatus: AvailabilityStatusVO.fromPrimitives(
        data.availabilityStatus
      ),
      blockReason: BlockReasonVO.fromPrimitives(data.blockReason),
    };
    return new DriverAvailabilityEntity(DriverAvailabilityEntityProps);
  }
  public toPrimitives(): TDriverAvailabilityEntityPrimitives {
    return {
      id: this.id.toString(),
      accountStatus: this.accountStatus.toPrimitives(),
      availabilityStatus: this.availabilityStatus.toPrimitives(),
      blockReason: this.blockReason.toPrimitives(),
    };
  }
}
