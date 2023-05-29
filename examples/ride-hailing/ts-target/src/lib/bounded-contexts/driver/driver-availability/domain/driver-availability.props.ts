import { Domain } from '@bitloops/bl-boilerplate-core';
import { AccountStatusVO } from './account-status.value-object';
import { AvailabilityStatusVO } from './availability-status.value-object';
import { BlockReasonVO } from './block-reason.value-object';
export interface DriverAvailabilityProps {
  id?: Domain.UUIDv4;
  accountStatus: AccountStatusVO;
  availabilityStatus: AvailabilityStatusVO;
  blockReason?: BlockReasonVO;
}
