import { AccountStatusVO } from './account-status.value-object';
import { AvailabilityStatusVO } from './availability-status.value-object';
import { BlockReasonVO } from './block-reason.value-object';
export interface DriverAvailabilityProps {
  id?: string;
  accountStatus: AccountStatusVO;
  availabilityStatus: AvailabilityStatusVO;
  blockReason?: BlockReasonVO;
}
